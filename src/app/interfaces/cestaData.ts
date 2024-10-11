

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
