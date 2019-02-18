import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Docente } from '../../models/docente';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class DocenteService {
  private url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private _http: HttpClient,
    private router: Router
  ) {
    this.url = `${environment.url}/api/`;
  }


  guardarDocente(docente: Docente) {
    this._http.post<Docente>(this.url + 'guardarDocente', docente, this.httpOptions).subscribe(res => {
      console.log('guardado!');
    }, error => console.log(error)
    )
  }

  consultarDocenteIngreso(docente: Docente) {
    this._http.post<Docente>(this.url + 'consultarDocenteIngreso', docente, this.httpOptions).subscribe(res => {
      this.iniciarSesionDocente(res);
      this.router.navigate(['/dashboard']);
    }, error => console.log(error)
    )
  }
  obtenerToken() {
    return localStorage.getItem('token');
  }

  obtenerIdDocente() {
    return localStorage.getItem('idDocente');
  }

  obtenerNombresDocente() {
    return localStorage.getItem('nombresDocente');
  }

  ObtenerApellidosDocente() {
    return localStorage.getItem('apellidosDocente');
  }

  obtenerPerfil() {
    const headers = new HttpHeaders({
      'authorization': this.obtenerToken(),
      'idDocente': this.obtenerIdDocente(),
      'Content-Type': 'application/json'
    });
    const params = {
      idDocente: this.obtenerIdDocente()
    };
    return this._http.post(this.url + 'obtenerPerfil', params, { headers: headers });
  }

  iniciarSesionDocente(docente) {
    localStorage.setItem('token', docente.token);
    localStorage.setItem('idDocente', docente.idDocente);
    localStorage.setItem('nombresDocente', docente.nombresDocente);
    localStorage.setItem('apellidosDocente', docente.apellidosDocente);
  }

  cerrarSesionDocente() {
    localStorage.clear();
    this.router.navigate(['/login']);    
  }

  obtenerPayload() {
    const token = this.obtenerToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  haIniciadoSesion() {
    const payload = this.obtenerPayload();
    if (payload) {
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
