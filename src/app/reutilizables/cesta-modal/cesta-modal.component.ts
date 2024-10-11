import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuscadorService } from '../../servicios/dinamicos/buscador.service';
import { HeaderService } from '../../servicios/dinamicos/header.service';
import { CestaService } from 'src/app/servicios/cesta.service';
import { LocalstorageBasicService } from 'src/app/servicios/localstorage-basic.service';
import { IF_cesta, IF_cestaResponse } from 'src/app/interfaces/cestaData';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

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
  // dataCostoTotal: number = 0;
  // cestaVacia:boolean = false;
  deternerCheck:boolean = false;
  
  // API VARIABLES
  // dataCestaAPI: Array<{titul0:string, preci0:number, descuent0:number, idJueg0:number, precioDescontad0:number, imagen:string}> = [];
  cesta:any[] = [];
  total:number = 0;
  usuarioObtenido:number = 0;


  public dataCestaAPI: IF_cesta[] = []; // Aquí se almacenará la información de la cesta
  public dataCostoTotal: number = 0;    // Aquí se almacenará el costo total
  public cestaVacia: boolean = false;   // Indica si la cesta está vacía o no
  // public isVisible: boolean = false;    // Para controlar la visibilidad del modal

  constructor(private headerServices:HeaderService,
    private sv_cesta:CestaService,
    private sv_localStorage: LocalstorageBasicService,
    private sv_autenticacion: AutenticacionService
  ){

  }


  // @Input() isVisible: boolean = false;
  @Input() isVisible: boolean = false;  // Declaramos la propiedad isVisible como input para poder recibir valores

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
    

    // this.headerServices.cestaVariableAPI$.subscribe( inf =>{
    //   this.dataCestaAPI = inf;
    //   if (inf.length == 0){
    //     this.mostrarCesta();
    //   }else{
    //     this.ocultarCesta();
    //   }
    // });


    // this.sv_autenticacion.id_USUARIO; // obtener el id almacenado del servicio de AUTENTICACIONSERVICE.ts
    // this.obtenerCesta(1); // Usar el ID del usuario real. Aquí estoy usando 1 como ejemplo
    this.obtenerCesta(this.sv_autenticacion.id_USUARIO);


    
    
    // this.checkLocalStorage();

    

  }

  // Método para obtener la cesta del usuario
  obtenerCesta(idUser: number): void {
    this.sv_cesta.verMiCesta(idUser).subscribe(
      (response: IF_cestaResponse) => {
        this.dataCestaAPI = response['Info de la cesta'];  // Almacenar la cesta obtenida
        this.dataCostoTotal = response.Total;  // Almacenar el total
        this.cestaVacia = this.dataCestaAPI.length === 0;  // Verificar si la cesta está vacía
      },
      (error) => {
        console.error('Error al obtener la cesta', error);
      }
    );
  }
  

  showModal(){
    // this.isVisible = true;
    this.isVisible = false;

  }

  checkLocalStorage() {
    if (localStorage.getItem('token') && this.deternerCheck == false) {
      this.deternerCheck = true; //para deterner el check una vez que haya comprobado el token
      const infoLocalStorage = this.sv_localStorage.obtenerItem('user');
      const userId = infoLocalStorage.id;
      this.usuarioObtenido = userId;

    }
    
  }


}
