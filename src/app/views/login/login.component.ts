import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule, CommonModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  login() {
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);

    if (this.loginForm.valid) {
      alert('Inicio de sesión válido');
    } else {
      alert('Formulario inválido. Por favor, revisa los campos.');
    }
  }
}


