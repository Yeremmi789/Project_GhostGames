import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IF_auth, usuario } from '../interfaces/authData';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalstorageBasicService } from './localstorage-basic.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {




  private GG_API = environment.apiRest; //http://localhost:8000/api/
  private STORAGE_URL = environment.apiStorage; //http://localhost:8000/storage/
  private _auth!: IF_auth;
  private _usuario!: usuario;
  //private userSubject = new BehaviorSubject<any>(null);
  public userSubject = new BehaviorSubject<IF_auth | null>(null);
  public user$: Observable<IF_auth | null> = this.userSubject.asObservable();


  public id_USUARIO: number = 0; //para guardar el usuario en una variable

  constructor(
    private httpC: HttpClient,
    private router: Router,
    private sv_localStorage: LocalstorageBasicService, // para hacer una variable global

  ) {

    // para guardar el id del usuario
    const infoLocalStorage = this.sv_localStorage.obtenerItem('user');
    if (infoLocalStorage) {
      const userId = infoLocalStorage.id;
      this.id_USUARIO = userId;
      // para guardar el id del usuario
    }



  }


  registro(datosTerapeutas: usuario) {
    return this.httpC.post(this.GG_API + "registrarse", datosTerapeutas);
  }

  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/');
    }
    else {
      this.router.navigateByUrl('/login');
      // this.router.navigateByUrl('/quienes-somos');
    }
  }

  // Método para iniciar sesión
  login(email: string, password: string) {
    const ruta_api = `${this.GG_API}loguearse`;
    const body = { email, password };

    return this.httpC.post<IF_auth>(ruta_api, body).pipe(
      tap(resp => {
        if (resp.valido) {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp));
          this.userSubject.next({
            usuario: resp.usuario,
            rol: resp.rol,  // Guardamos los roles que vienen del backend
            id: resp.id,
            email: resp.email,
            token: resp.token,
            valido: resp.valido
          });
        }
      }),
      map(resp => resp.valido),
      catchError(error => of(error.mssg))
    );
  }





  // Método para obtener el usuario
  getUser() {
    return this.userSubject.asObservable(); // Devuelve un observable del usuario
  }

  // Método para verificar si el usuario tiene un rol específico
  hasRole(role: string[]): boolean {
    const user = this.userSubject.getValue();
    // console.log('Verificando roles:', user?.rol);  // Verifica el array de roles

    return role.some(roles => user?.rol?.includes(roles)) || false;
  }

  // Funcion para un solo rol
  // hasRole(role: string): boolean {
  //   const user = this.userSubject.getValue();
  //   console.log('Verificando roles:', user?.rol);  // Verifica el array de roles
  //   return user?.rol?.includes(role) || false;
  // }

  /*login(email: string, password: string) {
   const ruta_api = `${this.GG_API}loguearse`;
   const body = { email, password };
   // console.log("Dentro del servicio: ")
   return this.httpC.post<IF_auth>(ruta_api, body)
     .pipe(
       tap(resp => {
         // console.log(resp)
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
 }*/

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
