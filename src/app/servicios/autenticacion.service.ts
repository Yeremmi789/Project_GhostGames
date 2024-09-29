import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IF_auth, usuario } from '../interfaces/authData';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private httpC: HttpClient, private router:Router) { }
  private GG_API = environment.apiRest; //http://localhost:8000/api/
  private STORAGE_URL = environment.apiStorage; //http://localhost:8000/storage/
  private _auth!: IF_auth;
  private _usuario!: usuario;


  registro(datosTerapeutas: usuario) {
    return this.httpC.post(this.GG_API + "registrarse", datosTerapeutas);
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/');
    }
    else{
      this.router.navigateByUrl('/login');
      // this.router.navigateByUrl('/quienes-somos');
    }
  }


  login(email: string, password: string) {
    const ruta_api = `${this.GG_API}loguearse`;
    const body = { email, password };
    console.log("Dentro del servicio: ")
    return this.httpC.post<IF_auth>(ruta_api, body)
      .pipe(
        tap(resp => {
          console.log(resp)
          if (resp.valido) {
            localStorage.setItem('token', resp.token!)
            this._usuario = {
              usuarioo: resp.usuario!,
              id: resp.id!,
            }
            localStorage.setItem('user', JSON.stringify(resp));
          }
        }),
        map(resp => resp.valido),
        catchError(error => of(error.mssg))
      );
  }




  private logeado = new BehaviorSubject<boolean>(this.verificar());
  var_logeado$ = this.logeado.asObservable();

  verificar() {
    return localStorage.getItem("informacion formulario") !== null;
    // Si regresa algun valor significa que es diferente de cero, portanto es TRUE
  }

  entrar() {
    this.logeado.next(true);
  }

  salir() {
    this.logeado.next(false);
  }

}
