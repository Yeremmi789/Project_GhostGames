import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GalleryModule, ImageItem, GalleryComponent, Gallery, GalleryImageDef, VideoItem, YoutubeItem, IframeItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';



@Component({
  selector: 'app-juego-carousel',
  standalone: true,
  imports: [
    GalleryModule,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './juego-carousel.component.html',
  styleUrl: './juego-carousel.component.css'
})


export class JuegoCarouselComponent implements OnInit{

  @ViewChild(GalleryComponent) g_Component!: GalleryComponent;
  @ViewChild(GalleryImageDef) img_Def!: GalleryImageDef;

  elementos: ImageItem[] = [];

  galeria_id = 'lightbox';

    // Agregado DEspues de hacer el Preview Dinámico
  constructor(
    public gallery:Gallery,
    private lightbox: Lightbox,

    private rou:ActivatedRoute,
  ){}
  datos:any;
  productoSeleccionado:any; //Definir el tipo de dato de cada producto

  ngOnInit(): void {


    // Agregado DEspues de hacer el Preview Dinámico

    this.rou.params.subscribe( (parametro) => {
      const prod_ID = +parametro['id'];
      // this.productoSeleccionado = this.obtenerProductoPorId(prod_ID);


      if(prod_ID == 1){
        this.elementos = [
        // new ImageItem({ src: 'assets/carousel-juegos/1lara.jpg', thumb: 'assets/carousel-juegos/1lara.jpg' }),
        // new ImageItem({ src: 'assets/carousel-juegos/2lara.jpg', thumb: 'assets/carousel-juegos/2lara.jpg' }),
        // new ImageItem({ src: 'assets/carousel-juegos/3lara.jpg', thumb: 'assets/carousel-juegos/3lara.jpg' }),
        // new ImageItem({ src: 'assets/carousel-juegos/4lara.jpg', thumb: 'assets/carousel-juegos/4lara.jpg' }),
        // new ImageItem({ src: 'assets/carousel-juegos/5lara.jpg', thumb: 'assets/carousel-juegos/5lara.jpg' }),
        // new ImageItem({ src: 'assets/carousel-juegos/6lara.jpg', thumb: 'assets/carousel-juegos/6lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/1img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/1img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/2img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/2img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/3img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/3img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/4img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/4img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/5img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/5img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/6img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/6img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/7img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/7img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/EA_SPORTS/8img.jpg', thumb: 'assets/carousel-juegos/EA_SPORTS/8img.jpg' }),
        
      ];
    }
    if(prod_ID == 2){
        this.elementos = [
        

        new ImageItem({ src: 'assets/carousel-juegos/1r.jpg', thumb: 'assets/carousel-juegos/1r.jpg' }),
      ];
    }

    if(prod_ID == 3){
      this.elementos = [
      // new ImageItem({ src: 'assets/carousel-juegos/1r.jpg', thumb: 'assets/carousel-juegos/1r.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/gtav.jpg', thumb: 'assets/carousel-juegos/gtav.jpg' })
      ];
    }
    if(prod_ID == 4){
      this.elementos = [
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/1hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/1hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/2hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/2hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/3hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/3hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/4hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/4hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/5hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/5hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/6hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/6hl.jpg' }),
      
      ];
    }
    if(prod_ID == 5){
      this.elementos = [
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/1ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/1ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/2ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/2ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/3ac.jpg', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/3ac.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/4ac.jpg', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/4ac.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/5ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/5ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/6ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/6ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/7ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/7ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/8ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/8ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/9ac.png', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/9ac.png' }),
      new ImageItem({ src: 'assets/carousel-juegos/ASSASSINS_CREED/10ac.jpg', thumb: 'assets/carousel-juegos/ASSASSINS_CREED/10ac.jpg' }),
      ];
    }
    if(prod_ID == 6){
      this.elementos = [
      new ImageItem({ src: 'assets/carousel-juegos/1dbd.jpg', thumb: 'assets/carousel-juegos/1dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/2dbd.jpg', thumb: 'assets/carousel-juegos/2dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/3dbd.jpg', thumb: 'assets/carousel-juegos/3dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/4dbd.jpg', thumb: 'assets/carousel-juegos/4dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/5dbd.jpg', thumb: 'assets/carousel-juegos/5dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/6dbd.jpg', thumb: 'assets/carousel-juegos/6dbd.jpg' }),
      ];
    }

    if(prod_ID == 7){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/1r.jpg', thumb: 'assets/carousel-juegos/1r.jpg' }),
      ];
    }

    if(prod_ID == 8){
      this.elementos = [
      new ImageItem({ src: 'assets/carousel-juegos/gtav.jpg', thumb: 'assets/carousel-juegos/gtav.jpg' })
      ];
    }
    if(prod_ID == 9){
      this.elementos = [
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/1hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/1hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/2hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/2hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/3hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/3hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/4hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/4hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/5hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/5hl.jpg' }),
      new ImageItem({ src: 'assets/carousel-juegos/HOWARTS/6hl.jpg', thumb: 'assets/carousel-juegos/HOWARTS/6hl.jpg' }),
      ];
    }

    if(prod_ID == 10){
      this.elementos = [
      new ImageItem({ src: 'assets/carousel-juegos/1dbd.jpg', thumb: 'assets/carousel-juegos/1dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/2dbd.jpg', thumb: 'assets/carousel-juegos/2dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/3dbd.jpg', thumb: 'assets/carousel-juegos/3dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/4dbd.jpg', thumb: 'assets/carousel-juegos/4dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/5dbd.jpg', thumb: 'assets/carousel-juegos/5dbd.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/6dbd.jpg', thumb: 'assets/carousel-juegos/6dbd.jpg' }),
      ];
    }

    if(prod_ID == 11){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/1img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/1img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/2img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/2img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/3img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/3img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/4img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/4img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/5img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/5img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/6img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/6img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/CALLISTO_PROTOCOL/7img.jpg', thumb: 'assets/carousel-juegos/CALLISTO_PROTOCOL/7img.jpg' }),
      ];
    }
    if(prod_ID == 12){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/1img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/1img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/2img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/2img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/3img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/3img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/4img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/4img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/5img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/5img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/6img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/6img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/FALLOUT/7img.jpg', thumb: 'assets/carousel-juegos/FALLOUT/7img.jpg' }),
        
      ];
    }
    if(prod_ID == 13 || prod_ID == 17){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/1lara.jpg', thumb: 'assets/carousel-juegos/1lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/2lara.jpg', thumb: 'assets/carousel-juegos/2lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/3lara.jpg', thumb: 'assets/carousel-juegos/3lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/4lara.jpg', thumb: 'assets/carousel-juegos/4lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/5lara.jpg', thumb: 'assets/carousel-juegos/5lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/6lara.jpg', thumb: 'assets/carousel-juegos/6lara.jpg' }),
      ];
    }
    if(prod_ID == 14){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/MOUNT_BLADE/1img.jpg', thumb: 'assets/carousel-juegos/MOUNT_BLADE/1img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/MOUNT_BLADE/2img.jpg', thumb: 'assets/carousel-juegos/MOUNT_BLADE/2img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/MOUNT_BLADE/3img.jpg', thumb: 'assets/carousel-juegos/MOUNT_BLADE/3img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/MOUNT_BLADE/4img.jpg', thumb: 'assets/carousel-juegos/MOUNT_BLADE/4img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/MOUNT_BLADE/5img.jpg', thumb: 'assets/carousel-juegos/MOUNT_BLADE/5img.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/MOUNT_BLADE/6img.jpg', thumb: 'assets/carousel-juegos/MOUNT_BLADE/6img.jpg' }),
        
      ];
    }
    if(prod_ID == 15){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/1lara.jpg', thumb: 'assets/carousel-juegos/1lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/2lara.jpg', thumb: 'assets/carousel-juegos/2lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/3lara.jpg', thumb: 'assets/carousel-juegos/3lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/4lara.jpg', thumb: 'assets/carousel-juegos/4lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/5lara.jpg', thumb: 'assets/carousel-juegos/5lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/6lara.jpg', thumb: 'assets/carousel-juegos/6lara.jpg' }),
      ];
    }
    if(prod_ID == 16){
      this.elementos = [
        new ImageItem({ src: 'assets/carousel-juegos/1lara.jpg', thumb: 'assets/carousel-juegos/1lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/2lara.jpg', thumb: 'assets/carousel-juegos/2lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/3lara.jpg', thumb: 'assets/carousel-juegos/3lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/4lara.jpg', thumb: 'assets/carousel-juegos/4lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/5lara.jpg', thumb: 'assets/carousel-juegos/5lara.jpg' }),
        new ImageItem({ src: 'assets/carousel-juegos/6lara.jpg', thumb: 'assets/carousel-juegos/6lara.jpg' }),
      ];
    }

    });


    



    const galleryRef = this.gallery.ref();
    galleryRef.load(this.elementos);


  }


}
