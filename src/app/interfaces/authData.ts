/*export interface IF_auth{
    id:number,
    usuario:string,
    email:string,
    password:string,
    activo:number,
    ultimo_acceso:string,
    token:string,
    valido:string,
}*/

export interface IF_auth {
    id: number;
    usuario: string;
    email: string;
    rol: string[];  // Los roles se manejan como un array de strings
    token: string;
    valido: boolean;
  }
  

// export interface IF_auth {
//     Usuario: {
//         id: number;
//         usuario: string;
//         email: string;
//         email_verified_at?: string | null;
//         activo?: number | null;
//         ultimo_acceso?: string | null;
//         created_at: string;
//         updated_at: string;
//     };
//     Roles: string[]; // Lista de roles
//     rol: string[];  // Aquí definimos que `rol` es un array de strings
//     token: string; // Token JWT
//     valido: boolean; // Cambia el tipo a booleano si corresponde
// }



export interface usuario{
    id?:number;
    usuarioo?:string;
    email?:string;
    //password?:string;
}