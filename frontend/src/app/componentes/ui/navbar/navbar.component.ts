import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../../services/docente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  nombreDocente: string;
  constructor(
    private docenteService: DocenteService,
  ) {
    this.nombreDocente = docenteService.obtenerNombresDocente();


  }

  ngOnInit() {
    this.verificarLogin();
  }
  cerrarSesion() {
    this.docenteService.cerrarSesionDocente();
    this.isLogin = false;
  }
  verificarLogin() {
    if (this.docenteService.haIniciadoSesion()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
