import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  private cesta = new BehaviorSubject<Array <{juego:string, costo:number, loMenos:number, idJuego:number, imagen:string}> >([]);
  cestaVariable$ = this.cesta.asObservable();

  agregarCesta(producto:{juego:string, costo:number, loMenos:number, idJuego:number, imagen:string}): void {
    let informacionCesta = this.cesta.getValue();
    informacionCesta.push(producto);
    this.cesta.next(informacionCesta);
  }

  eliminarDeCesta(producto: { juego: string, costo: number, loMenos: number, idJuego: number, imagen:string}): void {
    let informacionCesta = this.cesta.getValue();
    const indice = informacionCesta.findIndex(item =>
      item.idJuego === producto.idJuego

    );
  
    if (indice !== -1) {
      informacionCesta.splice(indice, 1); // Cambia a splice
      this.cesta.next(informacionCesta); // Actualiza el observable
    }
  }
  

  private costoTotalCesta = new BehaviorSubject<number>(0)
  costoTotalVariable$ =  this.costoTotalCesta.asObservable();

  mostrarTotalCesta(valorTotal:number):void{
    this.costoTotalCesta.next(valorTotal);
  }


}
