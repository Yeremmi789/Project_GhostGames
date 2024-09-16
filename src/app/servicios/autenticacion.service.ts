import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  private logeado = new BehaviorSubject<boolean>(this.verificar());
  var_logeado$ = this.logeado.asObservable();

  verificar(){
    return localStorage.getItem("informacion formulario") !== null;
    // Si regresa algun valor significa que es diferente de cero, portanto es TRUE
  }

  entrar(){
    this.logeado.next(true);
  }

  salir(){
    this.logeado.next(false);
  }

}
