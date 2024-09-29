import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { map, Observable } from 'rxjs';
import { IF_JuegoCarrusel, IF_JuegoCompleto } from '../interfaces/juegoCarruselData';
import { IF_galeriaCarrusel } from '../interfaces/juegoGaleriaData';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  constructor(private httpC: HttpClient) { }

  private GG_API = environment.apiRest; //http://localhost:8000/api/
  private STORAGE_URL = environment.apiStorage; //http://localhost:8000/storage/

  private _juegos!: IF_JuegoCarrusel;

  private _juegoCompleto!: IF_JuegoCompleto;

  // esta manera extendida se usa cuando la respuesta del api regresa con llaves corchetes y llaves [ { ... }] -> se usó get() en laravel
  getJuegos_carrusel(): Observable<IF_JuegoCarrusel[]> {
    const url = `${this.GG_API}carrusel`; //http://localhost:8000/api/carrusel
    return this.httpC.get<IF_JuegoCarrusel[]>(url).pipe(
      map(juegos => juegos.map(juego => {
        juego.portada = `${this.STORAGE_URL}${juego.portada}`;
        return juego;
      }))
    );
  }

  getJuegos_Carrusel_SinDescuentos():Observable<IF_JuegoCarrusel[]>{
    const url = `${this.GG_API}carruselNormal`;
    return this.httpC.get<IF_JuegoCarrusel[]>(url).pipe(
      map(juegos => juegos.map(juego =>{
        juego.portada = `${this.STORAGE_URL}${juego.portada}`;
        return juego
      }))
    );

  }

  // ``
  // esta manera se usa cuando la respuesta del api es con puras llaves { ... }  -> se usó first() en laravel

  getJuego_completo(id:number):Observable<IF_JuegoCompleto>{
    const url = `${this.GG_API}info_Juego/${id}`;
    return this.httpC.get<IF_JuegoCompleto>(url).pipe(
      map(juego => {
        juego.ruta_logo = `${this.STORAGE_URL}${juego.ruta_logo}`;
        return juego; // Devolver el objeto directamente
      })
    );
  }

  // getJuego_completo(id: number): Observable<IF_JuegoCompleto> {
  //   const url = `${this.GG_API}info_Juego/${id}`;
  //   return this.httpC.get<{ Juegos: IF_JuegoCompleto }>(url).pipe(
  //     map(response => {
  //       const juego = response.Juegos; // Accedemos al objeto de juego
  //       juego.ruta_logo = `${this.STORAGE_URL}${juego.ruta_logo}`; // Prepara la ruta de la logo
  //       return juego; // Devolver solo el objeto de juego
  //     })
  //   );
  // }



  // getJuego_Galeria(id: number):Observable<IF_galeriaCarrusel>{
  //   const url = `${this.GG_API}galeria/${id}`;
  //   return this.httpC.get<IF_galeriaCarrusel>(url).pipe(
  //     map(imagenes => {
  //       imagenes.ruta_img = `${this.STORAGE_URL}${imagenes.ruta_img}`;
  //       return imagenes;
  //     })
  //   )
  // }

  getJuego_Galeria(id: number): Observable<{ ruta_img: string, activo: number }[]> {
    const url = `${this.GG_API}galeria/${id}`; // Cambia esto según la URL de tu API
    return this.httpC.get<{ ruta_img: string, activo: number }[]>(url);
  }



}

// NOTAS
// +-+-+--+--+-+-+--++-+-+-+-+-+-+-+ CÓDIGO -+-+-+-+-+-+-+-+-+-+-+-+-+-+-++

// getJuegos_carrusel(): Observable<IF_JuegoCarrusel> {
//   const url = `${this.GG_API}carrusel`
//   return this.httpC.get<IF_JuegoCarrusel>(url);
// }

// getCarrusel(): Observable<IF_JuegoCarrusel> {
//   const url = `${this.GG_API}carrusel`
//   return this.httpC.get<IF_JuegoCarrusel>(url)
//     .pipe(
//       map(respuesta => {
//         this._juegos = {
//           id: respuesta.id!,
//           titulo: respuesta.titulo!,
//           portada: respuesta.portada!,
//           versionJuego: respuesta.versionJuego,
//           precio: respuesta.precio,
//           descuento: respuesta.descuento,
//           precioDescontado: respuesta.precioDescontado,
//         }
//         return respuesta;
//       })
//     );
// }

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* EXPLICACIÓN CÓDIGO -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

// getJuegos_carrusel()
//        Y
// getCarrusel()

//  Devuelven exactamente lo mismo, puede que tenga una diferencia en algo, pero me funciona mejor de la primera función, es más rápido
// Funciona si solamente devolvemos solo informacion SIN IMÁGENES o contenido multimédia

// y se consultó de la misma manera en el componente,

// En este, la primera funcion de getJuegos_carrusel() se ele colocó <IF_JuegoCarrusel[]> ... osea se le coloco corchetes en el servicio... obviamnete se lo quite para aplicarlo sin corchetes
// this.sv_juegos.getJuegos_carrusel().subscribe( r => {
//   r.forEach(juego => console.log(juego));
// });

// this.sv_juegos.getJuegos_carrusel().subscribe( re =>{
//   console.log(re);
// });

// this.sv_juegos.getCarrusel().subscribe( res => {
//   console.log("TERCERA CONSULTA");
//   console.log(res)
// });