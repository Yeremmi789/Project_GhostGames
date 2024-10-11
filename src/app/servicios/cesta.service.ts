import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IF_cesta, IF_cestaResponse } from '../interfaces/cestaData';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CestaService {

  constructor(private httpC: HttpClient) { }


  private GG_API = environment.apiRest; //http://localhost:8000/api/
  private STORAGE_URL = environment.apiStorage; //http://localhost:8000/storage/
  private _cesta!: IF_cesta;


  agregarCesta(cesta: IF_cesta):Observable<any>{
    return this.httpC.post(this.GG_API + "cesta", cesta);
  }

  verMiCesta(idUser: number): Observable<IF_cestaResponse> {
    const url = `${this.GG_API}miCesta/${idUser}`;
    return this.httpC.get<IF_cestaResponse>(url).pipe(
      map((response: IF_cestaResponse) => {
        response['Info de la cesta'] = response['Info de la cesta'].map((cesta: IF_cesta) => {
          cesta.juego.portada = `${this.STORAGE_URL}${cesta.juego.portada}`;
          return cesta;
        });
        return response;  // Asegúrate de retornar el objeto completo, con las portadas ajustadas
      })
    );
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
