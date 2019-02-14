import { Component, OnInit } from '@angular/core';
import { DocenteService } from './services/docente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyectoAngular';
  isLogin = false;
  constructor(
    private docenteService: DocenteService,
  ) { 
    this.verificarLogin();
  }


  ngOnInit() {

  }
  verificarLogin() {
    if (this.docenteService.obtenerPayload()) {
      this.isLogin = true;
    }
  }
}


