import { Component, OnInit, ViewChild} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';


// requerido - carousel// tambien ViewChild
import { NgFor, AsyncPipe } from '@angular/common';
import { GalleryModule, GalleryItem, ImageItem, GalleryComponent, Gallery, GalleryImageDef  } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';


@Component({
  selector: 'app-librerias',
  standalone: true,
  imports: [
    RouterLink,
    GalleryModule,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './librerias.component.html',
  styleUrl: './librerias.component.css',

  template: `
    <gallery></gallery>
  `,
})
export class LibreriasComponent implements OnInit{
  // carousel 1
  // @ViewChild(GalleryComponent) gallery!: GalleryComponent;
  @ViewChild(GalleryComponent) galleryComponent!: GalleryComponent;
  // Reference to the image template
  @ViewChild(GalleryImageDef) imageDef!: GalleryImageDef;

  items: ImageItem[] = [];

  // imagenes 1
  galleryId = 'myLightbox';
  // elementos: GalleryItem[];

  constructor(public gallery: Gallery, private lightbox: Lightbox,
  ) { }



  ngOnInit() {
    this.items = [
      new ImageItem({ src: 'assets/carousel/c1-1.jpeg', thumb: 'assets/carousel/c1-1.jpeg' }),
      new ImageItem({ src: 'assets/carousel/c1-2.jpg', thumb: 'assets/carousel/c1-2.jpg' }),
      new ImageItem({ src: 'assets/carousel/c1-3.jpg', thumb: 'assets/carousel/c1-3.jpg' }),
    ];

    // Carga los elementos en la galería
    const galleryRef = this.gallery.ref();
    galleryRef.load(this.items);


  }

   // Pasa las imágenes al Lightbox


  openLightbox(index: number) {
    // Abre el lightbox en el índice especificado
    this.lightbox.open(index, 'my-lightbox');
  }




}
