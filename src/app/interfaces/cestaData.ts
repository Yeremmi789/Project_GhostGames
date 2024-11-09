

export interface IF_juego {
    id: number;
    titulo: string;
    versionJuego: string;
    precio: number;
    descuento: number | null;
    precioDescontado: number | null;
    portada:string;
  }
  
  export interface IF_cesta {
    id: number;
    users_id: number;
    juego_id: number;
    activo: number;
    juego: IF_juego; // Relación con el juego
  }
  
  export interface IF_cestaResponse {
    "Info de la cesta": IF_cesta[];
    Total: number;
  }
  
//   export interface IF_cestaResponse extends Array<IF_cesta> {}


export interface IF_revisar{
  ok: boolean;
  
  // Juegos_ID: number; // se coloca porque ya hay una interface que tiene los valores que regresamos en el backend, el cual es solamente el id del juego. mas que nada para no hacer otra interface. Buena suerte a YOO del futuro :)... recuerda eres muy grande, algún día podremos darle una mejor comodidad a nuestros papás :D
  Juegos_ID: IF_cesta[] // se coloco el segundo, porque como ahora tambien regresa "juego_id" y "id", si solamente regresara uno, se usa el :number
  
}

// export interface IF_revisar {
//   ok: boolean;  // Propiedad adaptada
//   juegos_id: { juego_id: number }[];  // Refleja la estructura de la respuesta de la API
// }


