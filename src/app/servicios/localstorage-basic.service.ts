import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageBasicService {

  // private usuarioLogueado = new BehaviorSubject<boolean>( this.consultarUsuario("informacion formulario").usuario_logueado);
  private usuarioLogueado = new BehaviorSubject<boolean>( this.verificar());
  var_userLogueado$ = this.usuarioLogueado.asObservable();

  constructor() { }

  getUsuarioLogueado() {
    return this.usuarioLogueado.asObservable();
  }

  verificar(){
    return localStorage.getItem("informacion formulario") !== null;
    // Si regresa algun valor significa que es diferente de cero, portanto es TRUE
  }

  actualizarEstadoUsuario(valor:boolean){
    this.usuarioLogueado.next(valor);
  }

  // para guardar información
  // EJEMPLO
  // guardarItem()
  guardarItem(etiqueta: string, informacion: any) {
    localStorage.setItem(etiqueta, JSON.stringify(informacion));
  }

  // Retornar información del LocalStorage
  obtenerItem(etiqueta: string) {
    const datos = localStorage.getItem(etiqueta);
    return datos ? JSON.parse(datos) : null;
  }

  // eliminar del LocalStorage
  quitarLocalStorage(etiqueta: string) {
    localStorage.removeItem(etiqueta);
  }

  // Para guardar el registro
  guardarUsuario(variable:string, informacion:any){
    localStorage.setItem(variable, JSON.stringify(informacion));
  }

  consultarUsuario(variable: string){
    let datos = localStorage.getItem(variable);
    return datos ? JSON.parse(datos) : null;
  }

  
  /*
  Ejemplo de como utilizarlo en un componente:
  {
    constructor(private LocalstorageBasicService: LocalstorageBasicService) {}

    guardarDatos() {
      const usuario = { nombre: 'Juan', edad: 30 };
      this.LocalstorageBasicService.guardarItem('usuario', usuario);
    }

    obtenerDatos() {
      const usuario = this.LocalstorageBasicService.obtenerItem('usuario');
      console.log(usuario);
    }
  }
  
  */

}
