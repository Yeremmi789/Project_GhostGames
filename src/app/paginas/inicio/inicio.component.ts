import { Component } from '@angular/core';
import { LibreriasComponent } from '../librerias/librerias.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CestaModalComponent } from '../../reutilizables/cesta-modal/cesta-modal.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    LibreriasComponent,
    NgFor,
    CestaModalComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  /* AGREGADO - Prueba Modal Flotante dinámico */

  isModalVisible: boolean = false;
  modalTitle: string = "Título del Modal";
  modalContent: string = "Este es el contenido del modal.";

  showModal() {
    // Aquí podrías modificar el contenido dinámico antes de mostrar el modal
    this.modalTitle = "Título Dinámico";
    this.modalContent = "Este es un contenido generado dinámicamente.";
    this.isModalVisible = true;
  }

  handleClose() {
    this.isModalVisible = false; // Asegura que el modal se cierre correctamente
  }

  onConfirm() {
    // Lógica cuando el usuario confirma
    console.log('Confirmado');
    this.closeModal();
  }

  onCancel() {
    // Lógica cuando el usuario cancela
    console.log('Cancelado');
    this.closeModal();
  }

  closeModal() {
    this.isModalVisible = false;
  }

/*  */

  constructor(private router:Router){

  }

  // items = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Aquí puedes poner tus propios elementos
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14]; // Aquí puedes poner tus propios elementos
  currentIndex = 0;

  // El alert muestra la posicion de cada pagina :D
  // maxIndex = Math.ceil(this.items.length / 3) - 1; //se coloca el menos 1, porque se empieza desde el cero, ejemplo 0[1,2,3] 1[4,5,6] 2[7,8,9] 3[10,11,12] 4[13,14, ] 5[ , , ,]
  // como son 14 / 3 = 4.6666 entonces la funcion CEIL redondea hacia arriba lo cual es 5 y por eso se le disminuye 1

  maxIndex = Math.floor(this.items.length / 3); // esta funcion redondea hacia abajo, entonces será 4 paginas y no 5, como en la funcion anterior. ambas son correctas
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    // alert("Contador PREV : " +this.currentIndex)
  }

  next() {
    if (this.currentIndex < this.items.length - 3) {
      this.currentIndex++;
    }
    // alert("Contador Next : " + (this.currentIndex - 1))
  }

  

  products = [
    {
      id: 1,
      name: 'EA SPORTS FC™ 24 Standard Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4750c68b2bfa4f43933b81cfd5cc510c/EGS_EASPORTSFC24StandardEdition_EACanada_S2_1200x1600-5ecbb77fd9c0601ef34c4a988120fc42?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 2,
      name: 'Red Dead Redemtion 2',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 3,
      name: 'Grand Theft Auto V: Premium Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_1200x1600_Portrait Store Banner-1200x1600-382243057711adf80322ed2aeea42191.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 4,
      name: 'Hogwars Legacy',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S2_1200x1600-2bb94423bf1c7e2fca10577d9f2878b9?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 5,
      name: "Assasin's Creed  Mirage",
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },


//

    {
      id: 6,
      name: 'EA SPORTS FC™ 24 Standard Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4750c68b2bfa4f43933b81cfd5cc510c/EGS_EASPORTSFC24StandardEdition_EACanada_S2_1200x1600-5ecbb77fd9c0601ef34c4a988120fc42?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 7,
      name: 'Red Dead Redemtion 2',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 8,
      name: 'Grand Theft Auto V: Premium Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_1200x1600_Portrait Store Banner-1200x1600-382243057711adf80322ed2aeea42191.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 9,
      name: 'Hogwars Legacy',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S2_1200x1600-2bb94423bf1c7e2fca10577d9f2878b9?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    {
      id: 10,
      name: "Assasin's Creed  Mirage",
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
  ];

  paginaIndex = 0;
  ultimaPagina = Math.floor(this.products.length / 3) - 1;

  anterior(){
    if(this.paginaIndex > 0){
      this.paginaIndex--;
    }
  }

  siguiente(){
    if(this.paginaIndex < this.products.length / 3){
      this.paginaIndex++;
    }
  }

  mostrarMas(){
    this.router.navigate(['/productos']);
  }

  explorarMas(){
    this.router.navigate(['/explorar']);
  }

}
