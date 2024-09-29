export interface IF_JuegoCarrusel{
  id:number,
  name:string,
  description:string,
  image:string,
  category:string,
  title:string,
  discount:string,
  originalPrice:string,
  discountedPrice:string,
}


export interface IF_JuegoCompleto extends IF_JuegoCarrusel{
  // tabla juego
  // ...
  inicio_descuento:string,
  fin_descuento:string,
  
  categoria_id:number,
  logoJuego_id:number,
  colorFondo:string,
  plataforma:string,
  lanzamiento:string,
  activo:number,

  // tabla logo
  ruta_logo:string,
  activo_logo:string,
}
