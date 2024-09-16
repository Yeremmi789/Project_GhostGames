import { Component, ElementRef, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BuscadorService } from '../../servicios/dinamicos/buscador.service';
import { CestaModalComponent } from '../cesta-modal/cesta-modal.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [

    CestaModalComponent,
    NgFor,

  ],
  // exportAs: ['buscador'],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent implements OnInit{

  @ViewChild('backgroundDiv', { static: false }) backgroundDiv!: ElementRef;

  // comunicacion componente 1 y 2
  data!: string;
  dataCesta:  Array<{ juego: string, costo: number, loMenos: number, idJuego: number }> = [];
  dataTotalCesta: number = 0;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private el:ElementRef,
    private renderer2:Renderer2,
    private buscadorService:BuscadorService
  ){}

  datos:any;
  productoSeleccionado:any; //Definir el tipo de dato de cada producto
  // cambiar fondo dinamicamente
  // colorFondos:any;
  colorFondos: string = '#121313'; // Color por defecto
  
  

  ngOnInit(): void {
    
    this.buscadorService.currentColor.subscribe(color => this.colorFondos = color);


    // Opcional: Restablecer color cuando se navega a otra página
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.buscadorService.changeColor('#121313'); // Restablece el color al valor por defecto
      }
    });
    // comunicacion componente 1 y 2
    // Componente B
    this.buscadorService.variable$.subscribe( inf => {
      this.data = inf;
    });

    this.buscadorService.cestaVariable$.subscribe( infoCesta =>{
      this.dataCesta = infoCesta;
      console.log("Productos en la cesta: ", this.dataCesta); // Añadir este log

    })
    
    this.buscadorService.costoTotalVariable$.subscribe( infoTotal =>{
      this.dataTotalCesta = infoTotal;
    });
  }

  aplicarColorFondo(): void {
    if (this.backgroundDiv) {
      this.renderer2.setStyle(this.backgroundDiv.nativeElement, 'background-color', this.colorFondos);
    }
  }
  // cambiar fondo dinamicamente
  
  
  obtenerProductoPorId(id: number): any {
    const producto = this.products.find((item) => item.id === id);
    if (producto) return producto;
  }

  


  // Puedo solamende dejar el ID y el color de fondo, pero mejor dejarlo asi como esta, paraver que es siempre lo mismo
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
      discountedPrice: '219.80',
      // logoJuego: 'assets/carousel-juegos/6lara.jpg'
      // logoJuego: 'assets/logos/laraLogo.jpg'
      logoJuego: 'https://cdn2.unrealengine.com/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-ic1-400x400-1a101c6adcf1-400x132-564f4e1cc624.png?h=270&quality=medium&resize=1&w=480',
      colorFondo: '#082d31'
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
      discountedPrice: '219.80',
      logoJuego: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_IC1-625x625-38ae1bca6b89370d01ac3ed3a17daf7dd004f9f5.png?h=270&quality=medium&resize=1&w=480',
      colorFondo: '#000'
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
      discountedPrice: '219.80',
      logoJuego: 'assets/redLogo.avif',
      colorFondo: 'blue'
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
      discountedPrice: '219.80',
      logoJuego: 'assets/redLogo.avif',
      colorFondo: 'green'
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
      discountedPrice: '219.80',
      logoJuego: 'assets/redLogo.avif',
      colorFondo: 'red'
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


  isVIsible:boolean = false;
  modalTitle: string = "Título del Modal";
  modalContent: string = "Este es el contenido del modal.";

  handleClose() {
    this.isVIsible = false; // Asegura que el modal se cierre correctamente
  }

  // MODAL
  showModal(){
    this.isVIsible = true;
    this.modalTitle = "Título Dinámico";
    this.modalContent = "Este es un contenido generado dinámicamente.";
  }

  closeModal(){
    this.isVIsible = false;
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
  // MODAL





}
