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
  usuario: string = "";
  email: string = "";
  password: string = "";
  vercontrasenia: string = "";

  mostrarPassword: boolean = false;
  mostrarPassword2: boolean = false;

  constructor(private fb: FormBuilder,
    private localstorageService: LocalstorageBasicService,
    private router: Router,
    private autenticacionService: AutenticacionService,


  ) {
    this.formulario();
  }

  formulario() {
    this.registroForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|mx)$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*[A-Z]{2,})(?!.*[\d]{2,})[a-z]*[A-Z][a-z]*[\W_][a-z]*\d[a-z]*$/)]],
      verpassword: ['', [Validators.required]],
      usuario_logueado: false
    }, { validators: this.validarContrasenia });
  }


  registro(): any {

    if (this.registroForm.invalid) {
      alert("Los campos son invalidos");
    }else{
      this.autenticacionService.registro(this.registroForm.value).subscribe(res => {
        console.log('Registro exitoso');
        this.router.navigateByUrl('/');
        // this.completo();
        console.log(res);
      });
    }
  }

  // registro(): any {
  //   if (this.registroForm.invalid) {
  //     console.log('El formulario no es válido');
  //     return;
  //   }
  
  //   const formValues = {
  //     usuario: this.registroForm.get('usuario')?.value, // Mapeo correcto de 'usuario'
  //     email: this.registroForm.get('email')?.value, // Mapeo correcto de 'email'
  //     password: this.registroForm.get('password')?.value, // Mapeo correcto de 'password'
  //     password_confirmation: this.registroForm.get('password_confirmation')?.value // Confirmación de contraseña
  //   };
  
  //   this.autenticacionService.registro(formValues).subscribe(
  //     res => {
  //       console.log('Registro exitoso', res);
  //       this.router.navigateByUrl('/');
  //     },
  //     error => {
  //       console.error('Error en el registro', error);
  //     }
  //   );
  // }
  
  



  enviar() {
    if (this.registroForm.invalid) {
      alert("Los campos son invalidos");
    } else {
      // console.log('Formulario válido:', this.registroForm.value);
      let bandera = true;
      this.localstorageService.guardarUsuario("informacion formulario", this.registroForm.value);
      const infoLocalStorage = this.localstorageService.consultarUsuario("informacion formulario");
      const usuario = infoLocalStorage.i_usuario;
      alert("Bienvenido a GhostGames, " + usuario + " :)")
      this.router.navigateByUrl('/');

      // this.autenticacionService.entrar();
    }
  }

  verPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  verPassword2() {
    this.mostrarPassword2 = !this.mostrarPassword2;
  }

  validarContrasenia(form: FormGroup) {
    let password = form.get('password');
    let password2 = form.get('verpassword');

    return (password && password2) && (password.value === password2.value) ? null : { passwordRespuesta: true }
  }





}
