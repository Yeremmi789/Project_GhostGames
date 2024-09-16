import {Directive, Component, ElementRef, HostListener, NgModule, OnInit, ViewChild, Output, EventEmitter, Renderer2, ChangeDetectorRef  } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';

// Importando componentes para reutilizarlos
import {BuscadorComponent} from './reutilizables/buscador/buscador.component';

//
import { GalleryModule, GalleryItem, ImageItem, GalleryComponent } from 'ng-gallery';
import { ProductoCarouselComponent } from './reutilizables/producto-carousel/producto-carousel.component';
import { CarouselV1Component } from './reutilizables/carousel-v1/carousel-v1.component';
import { FooterComponent } from './reutilizables/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { CestaModalComponent } from './reutilizables/cesta-modal/cesta-modal.component';
import { HeaderService } from './servicios/dinamicos/header.service';
import { LocalstorageBasicService } from './servicios/localstorage-basic.service';
import { AutenticacionService } from './servicios/autenticacion.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    BuscadorComponent,
    GalleryModule,
    ProductoCarouselComponent,

    CarouselV1Component, //solo para tener una plantilla v1
    FooterComponent,
    CestaModalComponent,

    NgIf,
    NgClass,
  ],
  templateUrl: './app.component.html',
  // template: `<h1> HOLALALALAL <h1>`, // Para colocar directamente la estructura del html aquí
  // styles: `li { color: red; font-weight: 300; }`,// para colocar directamente los estilos aquí
  styleUrl: './app.component.css',

  template: `
    <gallery></gallery>
  `,

})

export class AppComponent implements OnInit{
  title = 'ghostgamesfrontend';

  menuVisible = false;
  usuarioRegistrado:boolean = false;
  logeado:boolean = false;
  

  alerta(){
    alert("BOTON DE USUARIO");
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  showAlert(): void {
    alert('Hiciste clic fuera del contenedor nav!');
  }

  dataCestaCantidad: Array<{juego:string, costo:number, loMenos:number, idJuego:number, imagen:string}> = [];
  cantidadCesta: number = 0;
  
  @ViewChild('botonToggle') btntoggle!: ElementRef;
  @ViewChild('navToggle') navTog!: ElementRef;
  
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  mostrarBusquedaComponent: boolean = true; //#1
  constructor(
    private ruta:Router,
    
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef, //para que se recargue el sitio o componente forzadamente
    private headerService:HeaderService,
    private localStorage:LocalstorageBasicService,
    private autenticacionService:AutenticacionService,
    private localstorageService:LocalstorageBasicService
  ){  

    this.renderer.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
         this.isMenuOpen=false;
      }
    });

    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target !== this.btntoggle.nativeElement && e.target!==this.navTog.nativeElement){
         this.menuVisible=false;
      }
    });


    
  }

  infoLocalStorage = this.localstorageService.consultarUsuario("informacion formulario");

  isMenuOpen = false;

  menus() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Mostrar u ocultar el componente de busqueda dependiendo el módulo - #1 #2 #3

  @ViewChild(GalleryComponent) gallery!: GalleryComponent;

  items: ImageItem[] = [];
  
  

  ngOnInit() {

    this.ruta.events.subscribe(event => { //#3
      if (event instanceof NavigationEnd) {
        this.verif_rutaActual();
        // console.log("Valor de NavigationEnd: ", NavigationEnd);
      }

      this.headerService.cestaVariable$.subscribe( info => {
        this.cantidadCesta = info.length;
      });
    });

    // this.items = [
    //   new ImageItem({ src: 'assets/carousel/c1-1.jpeg', thumb: 'assets/carousel/c1-1.jpeg' }),
    //   new ImageItem({ src: 'assets/carousel/c1-2.jpg', thumb: 'assets/carousel/c1-2.jpg' }),
    //   new ImageItem({ src: 'assets/carousel/c1-3.jpg', thumb: 'assets/carousel/c1-3.jpg' }),
    // ];

    
      this.localstorageService.var_userLogueado$.subscribe(estado => {
        this.logeado = estado;
      });
    
  }

  
  actualizarEstadoUsuario() {
    this.infoLocalStorage = this.localstorageService.consultarUsuario("informacion formulario");
    this.logeado = this.infoLocalStorage.usuario_logueado;
  }

  verif_rutaActual() { //#2
    const actualURL = this.ruta.url;
    this.mostrarBusquedaComponent = !['/registro','/login','/inicio','/contacto'].includes(actualURL);
    console.log(actualURL); // esto imprime toda la ruta actual, sin tomar encuenta "localhost:4200 ó el servidor"
    // console.log( this.mostrarBusquedaComponent);
  }
  
  isVisible:boolean = false;
  showModal(){
    this.isVisible = true;
  }

  handleClose() {
    this.isVisible = false; // Asegura que el modal se cierre correctamente
  }

  closeModal(){
    this.isVisible = false;
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

  salirUsuario(){
    // this.autenticacionService.salir();
    // this.localStorage.quitarLocalStorage('informacion formulario');
    let infoLS = this.localstorageService.consultarUsuario("informacion formulario");
    infoLS.usuario_logueado = false;
    this.localstorageService.guardarUsuario("informacion formulario", infoLS);
  }
}

@NgModule({
  imports: [
    InicioComponent,
    RouterModule.forRoot([]),
    BrowserModule,

  ],
})

class MyNgModule {}
