import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}




  login() {
    
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';
  
      this.authService.login(email, password).subscribe(user => {
        if (user) {
          alert('Inicio de sesión exitoso');
          this.router.navigateByUrl("/dashboard")
        } else {
          alert('Credenciales inválidas. Por favor, intenta nuevamente.');
        }
      }, error => {
        console.error('Error al intentar iniciar sesión:', error);
        alert('Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.');
      });
    } else {
      alert('Formulario inválido. Por favor, revisa los campos.');
    }
      
}}

