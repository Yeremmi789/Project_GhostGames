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
import { IF_cesta, IF_cestaResponse, IF_revisar } from 'src/app/interfaces/cestaData';


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
  id_usuario:number = 0; //para almacenar el id del usuario que se ha obtenido desde el servicio
  dataCestaAPI: IF_cesta[] = []; // Aquí se almacenará la respuesta del servidor  "información de la cesta" => $cesta...
  CestaAPI: any; // Aquí se almacenará la respuesta del servidor  "información de la cesta" => $cesta...
  tieneProductosCesta:boolean = false;
  idJuegoCesta: any; // Este es para guardar el valor y colocar una nueva propiedad a la consulta de los carruseles por separado de la consulta principal, que viene siendo el de solo carruseles
  public cantidadCesta: number = 0;
  public cestaVacia: boolean = false;   // Indica si la cesta está vacía o no

  cesta:any[] = [];
  total:number = 0;
  usuarioObtenido:number = 0;
  
  // DINAMISMO
  hoveredProduct: any; // Propiedad para almacenar el producto sobre el cual está el mouse
  selectedProduct: any; // Propiedad para almacenar el producto seleccionado

  //VARIABLES ROLES
  user: any; // Cambia a la interfaz que definas para el usuario

  constructor(
    private router: Router,
    private localStorage: LocalstorageBasicService,
    
    private buscadorService:BuscadorService, //Para cambiar color dinamico y cesta de compras
    private headerService:HeaderService,
    private sv_autenticacion:AutenticacionService,
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


    this.id_usuario = this.sv_autenticacion.id_USUARIO; // obtener el idDel usuario
    
    this.sv_juegos.getJuegos_carrusel().subscribe( re =>{
      // console.log(re);
      this.api_juegos = re;
      this.checkDeviceType(); // Verifica el tipo de dispositivo al cargar la página
    });

    this.sv_juegos.getJuegos_Carrusel_SinDescuentos().subscribe( res2 =>{
      this.api_juegosNormales = res2;
      this.checkDeviceType();
    });



    this.sv_cesta.revisarCesta(this.id_usuario).subscribe(
      (datos: IF_revisar) => {
          this.CestaAPI = datos.Juegos_ID;
          this.tieneProductosCesta = datos.ok;

          // Iterar sobre el arreglo Juegos_ID y mostrar el id de cada juego
          datos.Juegos_ID.forEach(juego => {
            console.log("ID del juego:", juego.id);
          });

          // console.log(datos); // Esto debería mostrar el arreglo de juegos con toda la información
          console.log(datos.Juegos_ID); // Esto debería mostrar el arreglo de juegos con toda la información
          // console.log(datos.ok); // Esto debería mostrar el arreglo de juegos con toda la información

          this.verificarJuegosCesta();
      },
      (error) => {
          console.error('Error al revisar la cesta:', error);
      }
  );
  

  // this.actualizarCantidadCesta();


  }
  // Método que verifica si el usuario tiene un rol
  isUserRole(role: string[]): boolean {
    return this.sv_autenticacion.hasRole(role);
  }

  verificarJuegosCesta():void{
      //api/carrusel.forEach( (variableCarrusel:any) )
      this.api_juegos.forEach((juego: any) => {
        const juegoEnCesta = this.CestaAPI.find((cestaItem: any) => cestaItem.juego_id === juego.id);
        juego.carritosss = juegoEnCesta ? true : false;

        // Asignar el ID de la cesta (si existe) o marcar como no en la cesta
      if (juegoEnCesta) {
        juego.carritosss = true;  // El juego está en la cesta
        juego.cesta_id = juegoEnCesta.id;  // Atribuir el ID de la cesta al juego
      } else {
        juego.carritosss = false;  // El juego no está en la cesta
        juego.cesta_id = null;  // No tiene un ID de cesta
      }

      });

  }




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
  

  // idProducto(juego_id: number, carritosss:boolean, cesta_id:number):void { //se coloco el boleano y cesta_id ya cuando se empleo el carrito, pero no es tan relevante para mostrar los productos, en un principio, solamente quitar lo relacionado con esto para dejar lo demas, tanto en el html como en la funcion de esta función
  idProducto11(product:any):void { //se coloco el boleano y cesta_id ya cuando se empleo el carrito, pero no es tan relevante para mostrar los productos, en un principio, solamente quitar lo relacionado con esto para dejar lo demas, tanto en el html como en la funcion de esta función
    

    if(!product.carritosss || product.carritosss == undefined){
      this.sv_cesta.agregarCesta(this.id_usuario, product.id).subscribe( 
        (respuesta: IF_cestaResponse) => {
          this.dataCestaAPI = respuesta['Info de la cesta'];
          product.carritosss = true;
          // this.sv_cesta.verMiCesta(this.id_usuario);
        },
        (error) => {
          console.error('Error al obtener la cesta', error);
        }
      );
    }else{
      
      this.sv_cesta.desactivarCesta(product.cesta_id).subscribe( resp =>{
        alert( "holaa" + resp)
        product.carritosss = false;
        // this.sv_cesta.verMiCesta(this.id_usuario);
      });

    }

  }

  idProducto(juego_id: number, carritosss:boolean, cesta_id:number):void { //se coloco el boleano y cesta_id ya cuando se empleo el carrito, pero no es tan relevante para mostrar los productos, en un principio, solamente quitar lo relacionado con esto para dejar lo demas, tanto en el html como en la funcion de esta función
    

    if(carritosss === false || carritosss == undefined){
      this.sv_cesta.agregarCesta(this.id_usuario, juego_id).subscribe( 
        (respuesta: IF_cestaResponse) => {
          this.dataCestaAPI = respuesta['Info de la cesta'];
          // console.log('Dentro de la reSpuesta de INFO DE LA CESTA');
          carritosss = true;
        },
        (error) => {
          console.error('Error al obtener la cesta', error);
        }
      );
      // this.actualizarCantidadCesta();
      this.obtenerCesta(this.sv_autenticacion.id_USUARIO);
    }else{
      this.sv_cesta.desactivarCesta(cesta_id).subscribe( resp =>{
        // alert( "holaa" + resp)
      });
      // this.actualizarCantidadCesta();

    }

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


  // actualizarCantidadCesta(): void {
  //   this.sv_cesta.verMiCesta(this.sv_autenticacion.id_USUARIO).subscribe(
  //     (response: IF_cestaResponse) => {
  //       // this.dataCestaAPI = response['Info de la cesta'];
  //       this.cantidadCesta = this.dataCestaAPI.length;  // Actualizar el número de productos en la cesta
  //     },
  //     (error) => {
  //       console.error('Error al actualizar la cantidad de la cesta', error);
  //     }
  //   );
  // }
  


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
