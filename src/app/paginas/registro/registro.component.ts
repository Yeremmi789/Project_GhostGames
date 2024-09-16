import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LocalstorageBasicService } from '../../servicios/localstorage-basic.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm!: FormGroup;
  i_usuario:string = "";
  i_correo:string = "";
  i_contrasenia:string = "";
  i_ver_contrasenia:string = "";

  mostrarPassword:boolean = false;
  mostrarPassword2:boolean =false;

  constructor(private fb:FormBuilder, 
    private localstorageService: LocalstorageBasicService,
    private router:Router,
    private autenticacionService:AutenticacionService,
  ){
    this.formulario();
  }

  formulario() {
    this.registroForm = this.fb.group({
      i_usuario: [this.i_usuario, [Validators.required, Validators.minLength(3)]],
      i_correo: [this.i_correo, [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|mx)$/)]],
      i_contrasenia: [this.i_contrasenia, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*[A-Z]{2,})(?!.*[\d]{2,})[a-z]*[A-Z][a-z]*[\W_][a-z]*\d[a-z]*$/)]],
      i_ver_contrasenia: [this.i_ver_contrasenia, [Validators.required]],
      usuario_logueado:false
    }, { validators: this.validarContrasenia });
  }
  


  enviar() {
    if (this.registroForm.invalid) {
      alert("Los campos son invalidos");
    } else {
      // console.log('Formulario válido:', this.registroForm.value);
      let bandera = true;
      this.localstorageService.guardarUsuario("informacion formulario", this.registroForm.value);
      const infoLocalStorage = this.localstorageService.consultarUsuario("informacion formulario");
      const usuario = infoLocalStorage.i_usuario;
      alert("Bienvenido a GhostGames, "+ usuario + " :)")
      this.router.navigateByUrl('/');

      // this.autenticacionService.entrar();
    }
  }

  verPassword(){
    this.mostrarPassword = !this.mostrarPassword;
  }
  verPassword2(){
    this.mostrarPassword2 = !this.mostrarPassword2;
  }

  validarContrasenia(form: FormGroup){
    let password = form.get('i_contrasenia');
    let password2 = form.get('i_ver_contrasenia');

    return (password && password2) && (password.value === password2.value) ? null : { passwordRespuesta : true}
  }

  



}
