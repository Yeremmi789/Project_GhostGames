import { Component, HostListener, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';  // Importar CommonModule
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LocalstorageBasicService } from '../../servicios/localstorage-basic.service';
import { BuscadorService } from '../../servicios/dinamicos/buscador.service';
import { HeaderService } from '../../servicios/dinamicos/header.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { JuegosService } from 'src/app/servicios/juegos.service';
import { CestaService } from 'src/app/servicios/cesta.service';


@Component({
  selector: 'app-producto-carousel',
  standalone: true,
  imports: [
    NgStyle,
    NgFor,
    NgClass,
    RouterOutlet,
    RouterLink,
    NgIf,
    // BrowserModule,
  ],
  templateUrl: './producto-carousel.component.html',
  styleUrl: './producto-carousel.component.css'
})
export class ProductoCarouselComponent implements OnInit {

  // CARRUSEL Y LÓGICA DEL RESPONSIVO #1
  esMobile: boolean = false;
  ultimaPagina: number = 0;
  ultimaPagina2: number = 0;
  cantidadDecimal: number = 0;
  cantidadDecimal2: number = 0;

  
  // API Y SERVICIOS #2
  api_juegos:any;
  api_juegosNormales:any;
  api_juegoInfo:any;
  
  userRoles: string[] = [];
  usuario_autenticado:boolean = false;

  cesta:any[] = [];
  total:number = 0;
  usuarioObtenido:number = 0;
  
  //VARIABLES ROLES
  user: any; // Cambia a la interfaz que definas para el usuario

  constructor(
    private router: Router,
    private localStorage: LocalstorageBasicService,
    
    private buscadorService:BuscadorService, //Para cambiar color dinamico y cesta de compras
    private headerService:HeaderService,
    private autenticacionService:AutenticacionService,
    private localstorageService:LocalstorageBasicService,
    // servicios API #2
    private sv_juegos: JuegosService,
    private sv_cesta: CestaService,

  ) {}

  // #1
  // Listener para detectar cambios en el tamaño de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkDeviceType();
  }

  // #1
  // Método para verificar el tipo de dispositivo
  checkDeviceType() {
    this.esMobile = window.innerWidth <= 768;
    if (this.esMobile) {
      this.applyMobileLogic();
    } else {
      this.applyDesktopLogic();
    }
  }

  // #1
  // Lógica específica para dispositivos móviles
  applyMobileLogic() {
    // console.log('Aplicando lógica para dispositivos móviles');
    this.ultimaPagina = Math.floor(this.api_juegos.length / 3);
    console.log("Antes de la variables API_JUEGOS")
    // console.log(this.api_juegos)
    this.ultimaPagina2 = Math.floor(this.api_juegosNormales.length / 3);
    // Aquí va tu lógica específica para móviles
    this.cantidadDecimal = this.api_juegos.length / 3;
    this.cantidadDecimal2 = this.api_juegosNormales.length / 3;
  }

  // #1
  // Lógica específica para dispositivos de escritorio
  applyDesktopLogic() {
    // console.log('Aplicando lógica para dispositivos de escritorio');
    // Aquí va tu lógica específica para escritorio

    this.ultimaPagina = Math.floor(this.api_juegos.length / 6);
    this.ultimaPagina2 = Math.floor(this.api_juegosNormales.length / 6);
    this.cantidadDecimal = this.api_juegos.length / 6;
    this.cantidadDecimal2 = this.api_juegosNormales.length / 6;
  }







  

  infoLocalStorage = this.localstorageService.consultarUsuario("informacion formulario");


  ngOnInit() {
    
    this.sv_juegos.getJuegos_carrusel().subscribe( re =>{
      // console.log(re);
      this.api_juegos = re;
      this.checkDeviceType(); // Verifica el tipo de dispositivo al cargar la página
    });

    this.sv_juegos.getJuegos_Carrusel_SinDescuentos().subscribe( res2 =>{
      this.api_juegosNormales = res2;
      this.checkDeviceType();
    });


  }
  // Método que verifica si el usuario tiene un rol
  isUserRole(role: string[]): boolean {
    return this.autenticacionService.hasRole(role);
  }

  hoveredProduct: any; // Propiedad para almacenar el producto sobre el cual está el mouse
  selectedProduct: any; // Propiedad para almacenar el producto seleccionado


  onMouseEnter(product: any) {
    this.hoveredProduct = product;
  }

  onMouseLeave() {
    this.hoveredProduct = null;
  }

  destacadosTitulo = "Destacados de las SUPEROFERTAS";
  completa1 = false;
  completa2 = false;
  destacadosTitulo2 = "Puedes echarle un ojo a estos otros Titulos";


  paginaIndex = 0;
  // ultimaPagina = Math.floor(this.products.length / 3);
  private recidirRedondear(cantidad: number) {
    let numeroExtraido: number;
    numeroExtraido = cantidad - Math.trunc(cantidad);
    if (numeroExtraido > 0.1) {
      this.ultimaPagina = cantidad - 1;
    } else {
      this.ultimaPagina = cantidad - 1;
    }

    return this.ultimaPagina;
  }





  prev() {
    if (this.paginaIndex > 0) {
      this.paginaIndex--;
    }
  }

  next() {
    // if(this.paginaIndex < this.products.length / 6){
    //   this.paginaIndex++;
    // }

    // const cantidadDecimal = this.products.length / 6;
    this.recidirRedondear(this.cantidadDecimal);

    // Tu lógica actual de next_v2 aquí
    if (this.paginaIndex < this.ultimaPagina) {
      this.paginaIndex++;
    }
  }



  products_v2 = [
    {
      id: 11,
      name: 'The Callisto Protocol',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/6b0541b5d9aa476cbf407643ab3b1d7d/EGS_TheCallistoProtocol_StrikingDistanceStudios_S2_1200x1600-1e31eacc92833279f5b7a8d07cd3826c?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-70 %',
      originalPrice: '300',
      discountedPrice: '1200',
      carrito:0
    },
    {
      id: 12,
      name: 'Fallout: New Vegas',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/3428aaab2c674c98b3acb789dcfaa548/EGS_FalloutNewVegas_ObsidianEntertainment_S2_1200x1600-866fe8b8f56e2e7bb862c49bf0627b9a?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '44,75',
      discountedPrice: '179',
      carrito:0
    },
    {
      id: 13,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80',
      carrito:0
    },
    {
      id: 14,
      name: 'Mount & Blade II: Bannerlord',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/aeac94c7a11048758064b82f8f8d20ed/EGS_MountBladeIIBannerlord_TaleWorldsEntertainment_S2_1200x1600-67b826955ba37d7d6c33ec578aaa2d54?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-80 %',
      originalPrice: '499,99',
      discountedPrice: '899,99',
      carrito:0
    },
    {
      id: 15,
      name: 'Gas Station Simulator',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/spt-assets/e48463d2c1fc4e17a3860fbbc8e54edc/gas-station-simulator-6na58.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '143,99',
      discountedPrice: '179,99',
      carrito:0
    },
    {
      id: 16,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80',
      carrito:0
    },

    {
      id: 17,
      name: 'Gas Station Simulator',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/spt-assets/e48463d2c1fc4e17a3860fbbc8e54edc/gas-station-simulator-6na58.jpg?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '143,99',
      discountedPrice: '179,99',
      carrito:0
    },
    {
      id: 18,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80',
      carrito:0
    },
    {
      id: 11,
      name: 'The Callisto Protocol',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/6b0541b5d9aa476cbf407643ab3b1d7d/EGS_TheCallistoProtocol_StrikingDistanceStudios_S2_1200x1600-1e31eacc92833279f5b7a8d07cd3826c?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-70 %',
      originalPrice: '300',
      discountedPrice: '1200',
      carrito:0
    },
    {
      id: 12,
      name: 'Fallout: New Vegas',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/3428aaab2c674c98b3acb789dcfaa548/EGS_FalloutNewVegas_ObsidianEntertainment_S2_1200x1600-866fe8b8f56e2e7bb862c49bf0627b9a?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '44,75',
      discountedPrice: '179',
      carrito:0
    },
    {
      id: 13,
      name: 'Shadow of the Tomb Raider: Definitive Edition',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/4b5461ca8d1c488787b5200b420de066/egs-shadowofthetombraiderdefinitiveedition-eidosmontralcrystaldynamicsnixxessoftware-s4-1200x1600-7ee40d6fa744_1200x1600-950cdb624cc75d04fe3c8c0b62ce98de?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-50 %',
      originalPrice: '599',
      discountedPrice: '219.80',
      carrito:0
    },
    {
      id: 14,
      name: 'Mount & Blade II: Bannerlord',
      description: 'Descripción del Producto 1',
      image: 'https://cdn1.epicgames.com/offer/aeac94c7a11048758064b82f8f8d20ed/EGS_MountBladeIIBannerlord_TaleWorldsEntertainment_S2_1200x1600-67b826955ba37d7d6c33ec578aaa2d54?h=480&quality=medium&resize=1&w=360',
      category: 'Juego base',
      title: 'Grand Theft Auto V: Premium Edition',
      discount: '-80 %',
      originalPrice: '499,99',
      discountedPrice: '899,99',
      carrito:0
    },


    // Añadir más productos según sea necesario
  ];


  paginaIndex2 = 0;
  // ultimaPagina2 = Math.floor(this.products_v2.length / 3);
  private recidirRedondear2(cantidad: number) {
    let numeroExtraido: number;
    numeroExtraido = cantidad - Math.trunc(cantidad);

    if (numeroExtraido > 0.1) {
      this.ultimaPagina2 = cantidad - 1;
    } else {
      this.ultimaPagina2 = cantidad - 1;
    }

    return this.ultimaPagina2;
  }



  prev_v2() {
    if (this.paginaIndex2 > 0) {
      this.paginaIndex2--;
    }
    // alert("Resultado: " + this.ultimaPagina2);

  }


  next_v2() {


    // const cantidadDecimal = this.products_v2.length / 6;
    this.recidirRedondear2(this.cantidadDecimal2);

    // Tu lógica actual de next_v2 aquí
    if (this.paginaIndex2 < this.ultimaPagina2) {
      this.paginaIndex2++;
    }
  }







  detalle_Producto(detalles_id: number) {
    // detalle_Producto(detalles_id:string){
    this.router.navigate(['/preview', detalles_id]);

    // this.localStorage.guardarItem('');
  }


  

  getJuego(id:number){
    this.router.navigate(['/preview', id]);
  }
  

  idProducto(juego_id: number):void {
    // en el HTML aparece esto:  $event.stopPropagation(); eso es para que no deje que se active alguna otra acción fuera del boton cuando doy clic en el boton

    // let producto = this.api_juegos.find((item) => item.id === id);

    // let producto2 = this.products_v2.find((item) => item.id === id);
    
    // let productoAgregado = producto || producto2;

    // if(producto){
    // if(productoAgregado){

    //   let nuevo = {
    //     juego: productoAgregado.name, //juego: producto.name,
    //     costo: parseFloat(productoAgregado.originalPrice), //parseFloat(producto.originalPrice),
    //     loMenos: parseFloat(productoAgregado.discount.replace('%', '')),  //parseFloat(producto.discount.replace('%', '')) // Convertir el descuento si es necesario
    //     idJuego: productoAgregado.id,
    //     imagen:productoAgregado.image
    //   };

    //   if(productoAgregado.carrito === 0){ //verificar si el juego tiene 1 o 0
    //     this.agregarJuego(nuevo);
    //     // this.modificarProducto(productoAgregado.id, 1); //this.modificarProducto(producto.id, 1);
    //     // this.invertirIcono();
    //   }else{
    //     // this.modificarProducto(productoAgregado.id, 0); //this.modificarProducto(producto.id, 0);
    //     this.quitarJuego(nuevo);
    //     this.invertirIcono();
    //     // console.log("segunda consulta: ", producto);
    //   }

    //   // se manda la info al componente B - Buscador
    //   this.enviarCesta();


    // }


    // this.sv_cesta.agregarCesta(juego_id).subscribe( resp => {

    // });

    const infoLocalStorage = this.localstorageService.obtenerItem('user');
      const userId = infoLocalStorage.id;
      this.usuarioObtenido = userId;
      alert(this.usuarioObtenido);

    this.sv_cesta.verMiCesta(this.usuarioObtenido).subscribe( respi => {
      alert("SE ACTIVO EL ver mi Cestaaaa");
      // console.log(respi.juego.titulo);

      // this.cesta = respi['info de la cesta'];
      // this.total =  respi['Total'];
      
    //   let nuevo = {
    //     juego: productoAgregado.name, //juego: producto.name,
    //     costo: parseFloat(productoAgregado.originalPrice), //parseFloat(producto.originalPrice),
    //     loMenos: parseFloat(productoAgregado.discount.replace('%', '')),  //parseFloat(producto.discount.replace('%', '')) // Convertir el descuento si es necesario
    //     idJuego: productoAgregado.id,
    //     imagen:productoAgregado.image
    //   };
    // titul0:string, preci0:number, descuent0:number, idJueg0:number, precioDescontad0:number, imagen:string


      // let nuevo = {
      //   titul0: respi.juego.titulo, //juego: producto.name,
      //   preci0: parseFloat(respi.juego), //parseFloat(producto.originalPrice),
      //   descuent0: parseFloat(respi.juego.descuento.replace('%', '')),  //parseFloat(producto.discount.replace('%', '')) // Convertir el descuento si es necesario
      //   idJueg0: respi.juego.id,
      //   precioDescontad0: respi.juego.precioDescontado,
      //   imagen: respi.image
      // };

      // this.agregarJuego(nuevo);


    });

    // AQUI PONER LA FUNCION DONDE VAMOS A COLOCAR EL ID, en lugar del cesta.ts
    // porque de aqui se va a compatir a headerSErvice y se actualice dinámicamente :D
  }

  arregloCarrito: Array<
    {
      // los campos que estan aquí. van hacer los campos de la bd de carrito de compras
      juego: string,
      costo: number,
      loMenos: number,
      idJuego: number;
      imagen:string,
    }
  > = [];


  arregloCarritoAPI: Array<
    {
      // los campos que estan aquí. van hacer los campos de la bd de carrito de compras
      titul0: string,
      preci0: number,
      descuent0: number,
      idJueg0: number;
      precioDescontad0:number,
      imagen:string,
    }
  > = [];

  agregarJuego(producto:{titul0:string, preci0:number, descuent0:number, idJueg0:number, precioDescontad0:number,imagen:string}):void {
    // this.arregloCarrito.push(producto);
    this.arregloCarritoAPI.push(producto);
    // console.log("Se agregó: ", this.arregloCarrito)
    let totalCost = this.sumarJuegos();
    // console.log("El costo total es: ", totalCost);

  
    // this.buscadorService.actualizarCesta(producto);
    // this.headerService.agregarCesta(producto);
    this.headerService.agregarCestaAPI(producto);

    

    
    
  }

  sumarJuegos(): number{
    let total = this.arregloCarrito.reduce( (acumulador, juegos) =>
      acumulador + juegos.costo,0    
    );

    // this.buscadorService.mostrarTotalCesta(total);
    this.headerService.mostrarTotalCesta(total);

    return total;
  }

  iconoBoleano:boolean = false;

  invertirIcono(): void{
    this.iconoBoleano = !this.iconoBoleano;
  }

  quitarJuego(producto:{juego:string, costo:number, loMenos:number, idJuego:number, imagen:string}){

    const indice = this.arregloCarrito.findIndex( item => 
      item.juego === producto.juego &&
      item.costo === producto.costo &&
      item.loMenos === producto.loMenos
    );

    if(indice !== -1){
      this.arregloCarrito.splice(indice, 1)
      // console.log("Se quito un elemento: ", this.arregloCarrito)
      let totalCost = this.sumarJuegos();
      // console.log("El costo total es: ", totalCost);

      // this.buscadorService.eliminarDeCesta(producto);
      this.headerService.eliminarDeCesta(producto);
    }

  }

  // modificarProducto(id:number, carrito:number){
  //   let infoProducto = this.api_juegos.findIndex(
  //     juego => juego.id === id
  //   );

  //   if(infoProducto !== -1){
  //     this.products[infoProducto].carrito = carrito;
  //     // console.log(this.products);
  //   }//else{alert("Producto no encontrado :(")}
    
  //   else{
  //     infoProducto = this.products_v2.findIndex(
  //       juegos2 => juegos2.id === id
  //     );

  //     if(infoProducto !== -1){
  //       this.products_v2[infoProducto].carrito = carrito;
  //       // console.log(this.products_v2);

  //     }else{
  //       alert("Producto no encontrado D:")
  //     }

  //   }
  //   // console.log(this.products);
  // }

  modificarProducto2(id:number, carritoAccion:number){
    let infoProducto2 = this.products_v2.findIndex(
      juego2 => juego2.id === id
    );

    if(infoProducto2 !== -1){
      this.products_v2[infoProducto2].carrito = carritoAccion;
    }else{
      alert("Producto no encontrado D:");
    }

  }

  // Cesta de compras
  // componente A
  enviarCesta(){
    this.buscadorService.actualizarInfo("Nuevo mensaje desde el componente de Productos :D");
  }

  // Cesta de compras

  


}
