export interface IF_auth{
    id:number,
    usuario:string,
    email:string,
    password:string,
    activo:number,
    ultimo_acceso:string,
    token:string,
    valido:string,
}


export interface usuario{
    id?:number;
    usuarioo?:string;
    email?:string;
    password?:string;
}