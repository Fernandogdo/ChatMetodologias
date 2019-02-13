import { Injectable } from '@angular/core';
import { GlosarioTermino } from '../models/glosarioTermino';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearGlosarioTerminoService {

  private mensajeFuente = new Subject<GlosarioTermino>();
  mensaje = this.mensajeFuente.asObservable();

  constructor() { }

  public agregarGlosarioTermino(glosarioTermino: GlosarioTermino){
    this.mensajeFuente.next(glosarioTermino);
  }
}
