import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-v1',
  standalone: true,
  imports: [
    NgStyle,
    NgFor,
    NgIf
  ],
  templateUrl: './carousel-v1.component.html',
  styleUrl: './carousel-v1.component.css'
})
export class CarouselV1Component {

  products = [
    { name: 'Producto 1',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4750c68b2bfa4f43933b81cfd5cc510c/EGS_EASPORTSFC24StandardEdition_EACanada_S2_1200x1600-5ecbb77fd9c0601ef34c4a988120fc42?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    { name: 'Read Red Redemtion 2',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    { name: 'Grand Theft Auto V: Premium Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_1200x1600_Portrait Store Banner-1200x1600-382243057711adf80322ed2aeea42191.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    { name: 'Hogwars Legacy',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S2_1200x1600-2bb94423bf1c7e2fca10577d9f2878b9?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
    { name: "Assasin's Creed  Mirage",
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/9bcf5a4dc1d54cb6ab1a42f3a70c5cf4/Carousel_BoxArt_1200x1600_1200x1600-38bda67bb1290f58e8a18ddc38a3c0ec?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80'
    },
  ];


  currentIndex = 0;
  translateX = 0;



  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTranslateX();
    }
  }

  next() {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
      this.updateTranslateX();
    }
  }

  updateTranslateX() {
    this.translateX = -this.currentIndex * 330; // 300 (ancho del item) + 30 (márgenes)
  }



}
