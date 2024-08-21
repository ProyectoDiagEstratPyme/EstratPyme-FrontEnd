import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/.+@.+\..+/)]),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  onSubmit() {
    this.login();
  }

  login() {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (this.loginForm.valid) {
      const email = emailControl?.value ?? '';
      const password = passwordControl?.value ?? '';

      this.authService.login(email, password).subscribe({
        next: user => {
          if (user) {
            this.authService.isLoggedIn = true;
            this.userService.login(user);
            this.router.navigateByUrl("/dashboard");
          } else {
            // Si no se encuentra usuario(empresas) va a buscar a admin
            this.authService.loginAdmin(email, password).subscribe({
              next: admin => {
                if (admin) {
                  this.authService.isLoggedIn = true;
                  this.userService.login(admin);
                  this.router.navigateByUrl("/dashboard-admin");
                } else {
                  this.showMessage('Correo y/o contraseña incorrectos. Por favor, intenta nuevamente.', 'error');
                  this.setInvalidClass(emailControl, passwordControl);
                }
              },
              // Esto maneja el error si hay error en la petición get de admins
              error: error => {
                console.error('Error al intentar iniciar sesión:', error);
                this.showMessage('Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.', 'error');
                this.setInvalidClass(emailControl, passwordControl);
              }
            });
          }
        },
        // Esto maneja el error si hay un error en la petición get de usuarios
        error: error => {
          console.error('Error al intentar iniciar sesión:', error);
          this.showMessage('Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.', 'error');
          this.setInvalidClass(emailControl, passwordControl);
        }
      });
    } else {
      if (emailControl?.hasError('pattern')) {
        this.showMessage('El correo debe contener un "@" válido.', 'error');
      } else {
        this.showMessage('Formulario inválido. Por favor, revisa los campos.', 'error');
      }
      this.setInvalidClass(emailControl, passwordControl);
    }
  }

  setInvalidClass(emailControl: AbstractControl<string | null> | null, passwordControl: AbstractControl<string | null> | null) {
    if (emailControl?.invalid) {
      emailControl.markAsTouched();
    }
  
    if (passwordControl?.invalid) {
      passwordControl.markAsTouched();
    }
  }

  showMessage(message: string, type: 'success' | 'error') {
    const messageDiv = document.getElementById(type === 'success' ? 'message' : 'error-message');
    if (messageDiv) {
      messageDiv.textContent = message;
      messageDiv.style.display = 'block';
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }
  }

  isRegisterRoute(): boolean {
    return this.router.url === "/register";
  }

  registrarse() {
    this.router.navigateByUrl("/register");
  }
}