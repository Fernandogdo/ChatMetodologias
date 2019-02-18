import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../../servicios/docente/docente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private docenteService: DocenteService,
  ) { }

  ngOnInit() {

  }
  cerrarSesion() {
    this.docenteService.cerrarSesionDocente();
  }
}
