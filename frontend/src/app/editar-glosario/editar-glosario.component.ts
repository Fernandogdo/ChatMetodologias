import { Component, OnInit } from '@angular/core';
import { ModalAgregarGlosarioComponent } from '../modal-agregar-glosario/modal-agregar-glosario.component'
import { MatDialog } from '@angular/material';
import { SalaChat } from '../models/salaChat';
import { GlosarioService } from '../services/glosario.service';
import { SalaChatService } from '../services/sala-chat.service';
import { Router, ActivatedRoute } from "@angular/router";
import { GlosarioTermino } from '../models/glosarioTermino';
import { CrearGlosarioTerminoService } from '../services/crear-glosario-termino.service';
import { DocenteService } from '../services/docente.service';

@Component({
  selector: 'app-editar-glosario',
  templateUrl: './editar-glosario.component.html',
  styleUrls: ['./editar-glosario.component.css']
})
export class EditarGlosarioComponent implements OnInit {

  private chat: SalaChat;
  private glosarioTermino: GlosarioTermino;
  private arrayGlosarioTermino: Array<GlosarioTermino> = new Array<GlosarioTermino>();
  private nombre: String;
  constructor(
    public dialog: MatDialog,
    private glosarioService: GlosarioService,
    private salaChatService: SalaChatService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private crearGlosarioTerminoService: CrearGlosarioTerminoService,
    private docenteService: DocenteService,

  ) {
    this.chat = new SalaChat('', '');
    this.glosarioTermino = new GlosarioTermino('', '', '');
  }

  ngOnInit() {

    this.nombre = this.docenteService.obtenerNombresDocente() + " " + this.docenteService.ObtenerApellidosDocente();

    if (this._Activatedroute.snapshot.params['idChat'] == undefined) {
      this.chat.docente = localStorage.getItem('idDocente');
      this.glosarioService.guardarSalaChat(this.chat).subscribe(
        response => {
          localStorage.setItem('idChatCreado', response['chatAlmacenado']['_id']);
        },
        error => {
          alert("error");
        }
      )
    } else {
      localStorage.setItem('idChatCreado', this._Activatedroute.snapshot.params['idChat']);
      this.listarTerminosGlosario();
      this.consultarNombreChat();
    }

    this.crearGlosarioTerminoService.mensaje
      .subscribe(
        mensaje => {
          this.arrayGlosarioTermino.push(new GlosarioTermino('', mensaje['termino'], mensaje['descripcion']));
        }
      )

  }

  modal(): void {
    this.dialog.open(ModalAgregarGlosarioComponent, {
      height: '280px',
      width: '400px',
    });
  }

  actualizarSalaChat() {
    this.chat.docente = localStorage.getItem('idDocente');
    this.chat._id = localStorage.getItem('idChatCreado');
    this.glosarioService.actualizarSalaChat(this.chat).subscribe(
      response => {
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  listarTerminosGlosario() {
    this.glosarioTermino.chat = localStorage.getItem('idChatCreado');
    this.glosarioService.listarTerminosGlosario(this.glosarioTermino).subscribe(
      response => {
        let terminosAlmacenados = response['terminosGlosarioAlmacenados'];
        for (let i = 0; i < response['terminosGlosarioAlmacenados'].length; i++) {
          this.arrayGlosarioTermino.push(new GlosarioTermino(terminosAlmacenados[i]['_id'], terminosAlmacenados[i]['termino'], terminosAlmacenados[i]['descripcion']));
        }
      },
      error => {
        alert("error");
      }
    )
  }

  consultarNombreChat() {
    this.salaChatService.obtenerNombreSalaChat(localStorage.getItem('idChatCreado')).subscribe(
      response => {
        //this.nombreChat = response;
        this.chat.nombreChat = response['salaEncontrada'][0]['nombreChat'];
      },
      error => {
        alert("error");
      }
    )
  }

  eliminarGlosario(idTermino) {
    this.glosarioService.eliminarTerminoGlosario(idTermino).subscribe(
      response => {
        alert("eliminado");
        this.arrayGlosarioTermino.forEach((terminoRecuperado, index) => {
          if (idTermino == terminoRecuperado._id) {
            this.arrayGlosarioTermino.splice(index, 1);
          }
        });
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
