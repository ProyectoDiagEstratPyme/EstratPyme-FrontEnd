import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { error } from 'console';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule, CommonModule,NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  constructor(private authService: AuthService){}

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    typeUser: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    sizeCompany: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required)
  });


  register() {

    if (this.registerForm.valid) {
      const userData = {...this.registerForm.value}
      this.authService.registerUser(userData).subscribe(
        response => {
          console.log(response)
        },
        error => console.log(error)
      )
    } else {
      let message = 'Formulario inválido. Por favor, revisa los siguientes campos: ';
      const errors = [];
      if (!this.registerForm.get('name')?.valid) {
        errors.push('nombre');
      }
      if (!this.registerForm.get('email')?.valid) {
        errors.push('correo electrónico');
      }
      if (!this.registerForm.get('password')?.valid) {
        errors.push('contraseña');
      }
      if (!this.registerForm.get('typeUser')?.valid) {
        errors.push('tipo de usuario');
      }
      if (!this.registerForm.get('id')?.valid) {
        errors.push('Identificación');
      }
      if (!this.registerForm.get('sizeCompany')?.valid) {
        errors.push('tamaño de la empresa');
      }
      if (!this.registerForm.get('sector')?.valid) {
        errors.push('sector');
      }

      alert(`${message}${errors.join(', ')}.`);
    }
  }


}
