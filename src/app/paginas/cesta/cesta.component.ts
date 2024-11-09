import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IF_cesta, IF_cestaResponse } from 'src/app/interfaces/cestaData';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { CestaService } from 'src/app/servicios/cesta.service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
  ],
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  
  public dataCestaAPI: IF_cesta[] = [];
  public dataCostoTotal: number = 0;
  public cestaVacia: boolean = false;


  constructor(
    private sv_cesta:CestaService,
    private sv_autenticacion:AutenticacionService

  ){}
  @Input() isVisible: boolean = false;  // Declaramos la propiedad isVisible como input para poder recibir valores


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.obtenerCesta(this.sv_autenticacion.id_USUARIO);
  }

  obtenerCesta(idUser: number): void {
    this.sv_cesta.verMiCesta(idUser).subscribe(
      (response: IF_cestaResponse) => {
        this.dataCestaAPI = response['Info de la cesta'];  
        this.cestaVacia = this.dataCestaAPI.length === 0;  // Verificar si la cesta está vacía
      },
      (error) => {
        console.error('Error al obtener la cesta', error);
      }
    );
  }


}
