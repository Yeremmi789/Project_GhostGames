import { Component, ElementRef, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';
import { ProductoCarouselComponent } from '../../reutilizables/producto-carousel/producto-carousel.component';
import { LibreriasComponent } from '../librerias/librerias.component';
import { JuegoCarouselComponent } from '../../reutilizables/juego-carousel/juego-carousel.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BuscadorService } from '../../servicios/dinamicos/buscador.service';


@Component({
  selector: 'app-vista-previa',
  standalone: true,
  imports: [
    ProductoCarouselComponent,
    LibreriasComponent,
    JuegoCarouselComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './vista-previa.component.html',
  styleUrl: './vista-previa.component.css'
})
export class VistaPreviaComponent implements OnInit{

  constructor(
    private router:Router,
    private rou:ActivatedRoute, //Obtener la info del producto atraves del ID
    private el:ElementRef,
    private renderer2:Renderer2,
    private colorService: BuscadorService,
  ){

  }

  datos:any;
  productoSeleccionado:any; //Definir el tipo de dato de cada producto
  colorFondos:any;

  clase_cFull = "c-full";


  ngOnInit(): void {
    this.rou.params.subscribe( (parametro) => {
      const prod_ID = +parametro['id'];
      this.productoSeleccionado = this.obtenerProductoPorId(prod_ID);

      if(this.productoSeleccionado){
        // this.el.nativeElement.backgroundColor = this.productoSeleccionado.colorFondo;
        this.colorFondos = this.productoSeleccionado.colorFondo;
        this.colorService.changeColor(this.colorFondos); // Cambia el color en el servicio

      }

    });

  }

// Prueba de añadir elementos al html desde TypeScript

@ViewChild('elementoContenedorDinamico') elementoContenedorDinamico:any;

agregarElemento(textoElemento: string) {
  const nuevoElemento = this.renderer2.createElement('p');
  const textoNodo = this.renderer2.createText(textoElemento);
  this.renderer2.appendChild(nuevoElemento, textoNodo);
  this.renderer2.appendChild(this.elementoContenedorDinamico.nativeElement, nuevoElemento);
}
  // Prueba de añadir elementos al html desde TypeScript



  obtenerProductoPorId(id: number): any {
    const producto = this.products.find((item) => item.id === id);
    if (producto) return producto;

    const productoKid = this.products.find((kid) => kid.id === id);
    if (productoKid) return productoKid;

    const productoMan = this.products.find((man) => man.id === id);
    return productoMan;
  }


  products = [
    {
      id: 1,
      name: 'EA SPORTS FC™ 24 Standard Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4750c68b2bfa4f43933b81cfd5cc510c/EGS_EASPORTSFC24StandardEdition_EACanada_S2_1200x1600-5ecbb77fd9c0601ef34c4a988120fc42?h=480&quality=medium&resize=1&w=360',
      // image: 'assets/carousel-juegos/EA_SPORTS/1img.jpg',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80',
      // logoJuego: 'assets/carousel-juegos/6lara.jpg'
      // logoJuego: 'assets/logos/laraLogo.jpg'
      // logoJuego: 'https://cdn2.unrealengine.com/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-ic1-400x400-1a101c6adcf1-400x132-564f4e1cc624.png?h=270&quality=medium&resize=1&w=480',
      logoJuego: 'assets/carousel-juegos/Logos/eaLogo.webp',
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
      // logoJuego: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_IC1-625x625-38ae1bca6b89370d01ac3ed3a17daf7dd004f9f5.png?h=270&quality=medium&resize=1&w=480',
      logoJuego: 'assets/carousel-juegos/Logos/redLogo.avif',
      colorFondo: '#000000'
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
      logoJuego: 'assets/carousel-juegos/Logos/gtaLogo.avif',
      colorFondo: '#456F19'
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
      logoJuego: 'assets/carousel-juegos/Logos/hLogo.avif',
      colorFondo: '#082d31'
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
      logoJuego: 'assets/carousel-juegos/Logos/as1Logo.webp',
      colorFondo: '#000000'
    },


//

    {
      id: 6,
      name: 'Dead By Daylight',
      description: 'Descripción del Producto 1',
      // image: 'https://cdn1.epicgames.com/offer/4750c68b2bfa4f43933b81cfd5cc510c/EGS_EASPORTSFC24StandardEdition_EACanada_S2_1200x1600-5ecbb77fd9c0601ef34c4a988120fc42?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      logoJuego: 'assets/carousel-juegos/Logos/dbdLogo.avif',
      discountedPrice: '219.80',
      colorFondo: '#000000'
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
      discountedPrice: '219.80',
      // logoJuego: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fheather%2Fhome%2FEGS_RockstarGames_RedDeadRedemption2_IC1-625x625-38ae1bca6b89370d01ac3ed3a17daf7dd004f9f5.png?h=270&quality=medium&resize=1&w=480',
      logoJuego: 'assets/carousel-juegos/Logos/redLogo.avif',
      colorFondo: '#000000'
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
      discountedPrice: '219.80',
      logoJuego: 'assets/carousel-juegos/Logos/gtaLogo.avif',
      colorFondo: '#456F19'
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
      discountedPrice: '219.80',
      logoJuego: 'assets/carousel-juegos/Logos/hLogo.avif',
      colorFondo: '#082d31'
    },
    {
      id: 10,
      name: 'Dead By Daylight',
      description: 'Descripción del Producto 1',
      // image: 'https://cdn1.epicgames.com/offer/4750c68b2bfa4f43933b81cfd5cc510c/EGS_EASPORTSFC24StandardEdition_EACanada_S2_1200x1600-5ecbb77fd9c0601ef34c4a988120fc42?h=480&quality=medium&resize=1&w=360',
      category: 'JUEGO BASE',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      logoJuego: 'assets/carousel-juegos/Logos/dbdLogo.avif',
      discountedPrice: '219.80',
      colorFondo: '#000000'
    },

    {
      id:11,
      name: 'The Callisto Protocol',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/6b0541b5d9aa476cbf407643ab3b1d7d/EGS_TheCallistoProtocol_StrikingDistanceStudios_S2_1200x1600-1e31eacc92833279f5b7a8d07cd3826c?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-70 %',
      originalPrice: '300',
      logoJuego: 'assets/carousel-juegos/Logos/cLogo.avif',
      discountedPrice: '1200',
      colorFondo: '#000000'
    },
    {
      id:12,
      name: 'Fallout: New Vegas',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/3428aaab2c674c98b3acb789dcfaa548/EGS_FalloutNewVegas_ObsidianEntertainment_S2_1200x1600-866fe8b8f56e2e7bb862c49bf0627b9a?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '44,75',
      logoJuego: 'assets/carousel-juegos/Logos/fLogo.avif',
      discountedPrice: '179',
      colorFondo: '#000000'
    },
    {
      id:13,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      logoJuego: 'assets/carousel-juegos/Logos/TomLogo.avif',
      discountedPrice: '219.80',
      colorFondo: '#082d31'
    },
    {
      id:14,
      name: 'Mount & Blade II: Bannerlord',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/aeac94c7a11048758064b82f8f8d20ed/EGS_MountBladeIIBannerlord_TaleWorldsEntertainment_S2_1200x1600-67b826955ba37d7d6c33ec578aaa2d54?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-80 %',
      originalPrice: '499,99',
      logoJuego: 'assets/carousel-juegos/Logos/mbLogo.avif',
      discountedPrice: '899,99',
      colorFondo: '#000000'
    },
    {
      id:15,
      name: 'Gas Station Simulator',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/spt-assets/e48463d2c1fc4e17a3860fbbc8e54edc/gas-station-simulator-6na58.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '143,99',
      logoJuego: 'assets/carousel-juegos/Logos/redLogo.avif',
      discountedPrice: '179,99'
    },
    {
      id:16,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      logoJuego: 'assets/carousel-juegos/Logos/TomLogo.avif',
      discountedPrice: '219.80'
    },
    {
      id:17,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      logoJuego: 'assets/carousel-juegos/Logos/TomLogo.avif',
      discountedPrice: '219.80'
    },

  ];


}
