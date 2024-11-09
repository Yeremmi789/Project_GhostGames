import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IF_cesta, IF_cestaResponse, IF_revisar } from '../interfaces/cestaData';
import { BehaviorSubject, map, Observable } from 'rxjs';

// @ cuando aparezca esto en alguna linea o funcion etc. buscar hasta abajo del archivo, hay una explicacion acerca de eso
// # cuando se establece una seccion de algo, puede se como, variables de la API, VARIABLES LOCALES,ESTILOS,ETC

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  constructor(private httpC: HttpClient) { }


  private GG_API = environment.apiRest; //http://localhost:8000/api/
  private STORAGE_URL = environment.apiStorage; //http://localhost:8000/storage/
  private _cesta!: IF_cesta;

  private cestaSubject = new BehaviorSubject<IF_cesta[]>([]);
  public cestaObservable = this.cestaSubject.asObservable();


  agregarCesta(usuario: number, juego:number):Observable<IF_cestaResponse>{
    // @1.-
    // const body = { usuario: idUsuario, juego: idJuego };  // Cambiado a 'usuario' y 'juego'
    // console.log('DENTRO DEL SERVICIOOOOO'); console.log('Valor de idusuario: '); console.log(idUsuario); console.log('Valor de juego_id: '); console.log(idJuego);
    const body = { usuario, juego};  // Cambiado a 'usuario' y 'juego'

    return this.httpC.post<IF_cestaResponse>(this.GG_API + "cesta", body);
  }

  verMiCesta(idUser: number): Observable<IF_cestaResponse> {
    const url = `${this.GG_API}miCesta/${idUser}`;
    return this.httpC.get<IF_cestaResponse>(url).pipe(
      map((response: IF_cestaResponse) => {
        response['Info de la cesta'] = response['Info de la cesta'].map((cesta: IF_cesta) => {
          cesta.juego.portada = `${this.STORAGE_URL}${cesta.juego.portada}`;
          return cesta;
        });
        // return response;  // Asegúrate de retornar el objeto completo, con las portadas ajustadas

        // Actualizamos el BehaviorSubject con los datos nuevos
        this.cestaSubject.next(response['Info de la cesta']);
        return response;

      })
    );
  }

  actualizarCesta(dataCesta: IF_cesta[]): void {
    this.cestaSubject.next(dataCesta);
  }


  desactivarCesta(id:number):Observable<IF_cesta>{
    const url = `${this.GG_API}cesta/${id}/desactivar`;
    return this.httpC.put<IF_cesta>(url,id);
  }


  revisarCesta(id: number): Observable<IF_revisar> {
    const url = `${this.GG_API}cesta/${id}/revisar`;
    return this.httpC.get<IF_revisar>(url);
}

  

  // // Getter para obtener la cesta desde el servicio
  // get cesta(): IF_cesta {
  //   return this._cesta;
  // }

  // // Setter para almacenar la cesta en el servicio
  // set cesta(cesta: IF_cesta) {
  //   this._cesta = cesta;
  // }


}


// @1.- en "body" se debe colocarel nombre de como es que se espera en el backend, cuando se hace un formulario,

// agregarCesta(usuario: number, juego:number):Observable<IF_cestaResponse>{
  
// const body = { usuario, juego};
//   return this.httpC.post<IF_cestaResponse>(this.GG_API + "cesta", body);
// }


// public function addCesta(Request $peticion)
// {
//     $id_usuario = $peticion->usuario;
//     $id_juego = $peticion->juego;

//     $cesta = new Cesta();
//     $cesta->users_id = $id_usuario;
//     $cesta->juego_id = $id_juego;
//     $cesta->activo = 1;
//     $cesta->save();
//     ...