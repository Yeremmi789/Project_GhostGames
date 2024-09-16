import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { LocalstorageBasicService } from '../../servicios/localstorage-basic.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mostrarPassword:boolean = false;
  loginForm!:FormGroup;
  i_correo:string = "";
  i_password:string = "";
  infoLS:boolean = false;

  constructor(
    private localstorageService:LocalstorageBasicService,
    private fb:FormBuilder,
    private router:Router,
    private autenticacionService:AutenticacionService,
  ){
    this.formulario();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  verPassword(){
    this.mostrarPassword = !this.mostrarPassword;
  }

  formulario(){
    this.loginForm = this.fb.group({
      i_correo: this.i_correo,
      i_password: this.i_password,
    });
  }

  verificarDatos(){

    this.autenticacionService.var_logeado$.subscribe( inf =>{
      this.infoLS = inf;
      // alert("Valor de inf: "+ inf);
      // alert("Valor de infLS: "+ this.infoLS);
    })

    var inFormulario = this.loginForm.value;
    
    if(this.infoLS){
      let infoLocalStorage = this.localstorageService.consultarUsuario("informacion formulario");
      const correo = infoLocalStorage.i_correo;
      const pass = infoLocalStorage.i_contrasenia;
      const usuario = infoLocalStorage.i_usuario;
      if(!this.loginForm.value){
        alert("No existe ningún valor, intentelo de nuevo, porfavor");
      }else{
        if( (correo === inFormulario.i_correo) && (pass === inFormulario.i_password) ){
          alert("Bienvenido a GhostGames, "+ usuario);
          this.router.navigate(['/']);
          infoLocalStorage.usuario_logueado = true;
          this.localstorageService.guardarUsuario("informacion formulario", infoLocalStorage);
        }else{
          alert("No existe ninguna cuenta parecida");
        }
      }
    }else{
      alert("AÚN NO EXISTEN REGISTROS EN EL SISTEMA");
      alert("INTENTE REGISTRANDOSE PRIMERO, PORFAVOR");
    }
  }

}
