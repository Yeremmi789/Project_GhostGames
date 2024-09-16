import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuscadorService } from '../../servicios/dinamicos/buscador.service';
import { HeaderService } from '../../servicios/dinamicos/header.service';

@Component({
  selector: 'app-cesta-modal',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
  ],
  templateUrl: './cesta-modal.component.html',
  styleUrl: './cesta-modal.component.css'
})
export class CestaModalComponent {

  dataCesta: Array<{juego:string, costo:number, loMenos:number, idJuego:number, imagen:string}> = [];
  dataCostoTotal: number = 0;
  cestaVacia:boolean = false;

  constructor(private headerServices:HeaderService){

  }


  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>(); // Emite un evento cuando el modal se cierra

  closeModal() {
    this.isVisible = false;
    this.onClose.emit(); // Emite el evento cuando el modal se cierra
  }

  mostrarCesta(){
    this.cestaVacia = true;
  }
  ocultarCesta(){
    this.cestaVacia = false;
  }
  


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.headerServices.cestaVariable$.subscribe( inf =>{
      this.dataCesta = inf;
      if (inf.length == 0){
        this.mostrarCesta();
      }else{
        this.ocultarCesta();
      }
    });


    this.headerServices.costoTotalVariable$.subscribe( infoCesta =>{
      this.dataCostoTotal = infoCesta;
    });

  }

  showModal(){
    this.isVisible = true;
  }


}
