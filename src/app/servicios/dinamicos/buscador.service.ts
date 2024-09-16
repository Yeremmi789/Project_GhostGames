import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor() { }

  private colorSource = new BehaviorSubject<string>('#121313');
  currentColor = this.colorSource.asObservable();

  changeColor(color: string) {
    this.colorSource.next(color);
  }

  // CARRITO DE COMPRAS TEMPORAL
  private dataSubject = new BehaviorSubject<string>("Datos iniciales");
  variable$ = this.dataSubject.asObservable();
  
  actualizarInfo(nuevo: string){
    this.dataSubject.next(nuevo);
  }
  
  // CARRITO DE COMPRAS TEMPORAL

  // BehaviorSubject que almacena los productos en la cesta
  private cesta = new BehaviorSubject<Array<{ juego: string, costo: number, loMenos: number, idJuego: number }>>([]);
  cestaVariable$ = this.cesta.asObservable(); // Observable para compartir los datos

  // Método para actualizar la cesta con un nuevo producto
  actualizarCesta(producto: { juego: string, costo: number, loMenos: number, idJuego: number }): void {
    let informacionCesta = this.cesta.getValue(); // Obtener la cesta actual
    informacionCesta.push(producto); // Agregar el nuevo producto
    this.cesta.next(informacionCesta); // Actualizar el BehaviorSubject
    // console.log("se ejecutó la cesta")
    // console.log(producto);
  }

  eliminarDeCesta(producto: { juego: string, costo: number, loMenos: number, idJuego: number }): void {
    // Obtener el estado actual de la cesta
    let informacionCesta = this.cesta.getValue();
  
    // Encontrar el índice del producto a eliminar
    const indice = informacionCesta.findIndex(item => 
      item.juego === producto.juego &&
      item.costo === producto.costo &&
      item.loMenos === producto.loMenos
    );
  
    // Si el producto existe, eliminarlo
    if (indice !== -1) {
      informacionCesta.splice(indice, 1);
      this.cesta.next(informacionCesta); // Actualizar el BehaviorSubject
      console.log("Se quitó de la cesta: ", informacionCesta);
    }
  }

  private costoTotalCesta = new BehaviorSubject<number>(0)
  costoTotalVariable$ =  this.costoTotalCesta.asObservable();

  mostrarTotalCesta(valorTotal:number):void{
    this.costoTotalCesta.next(valorTotal);
  }

}
