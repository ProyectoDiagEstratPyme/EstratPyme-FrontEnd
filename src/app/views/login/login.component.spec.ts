import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
registrarse() {
throw new Error('Method not implemented.');
}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/.+@.+\..+/)]),
    password: new FormControl('', Validators.required)
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

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
            this.router.navigateByUrl("/dashboard");
          } else {
            this.showMessage('Correo y/o contraseña incorrectos. Por favor, intenta nuevamente.', 'error');
            this.setInvalidClass(emailControl, passwordControl);
          }
        },
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
      if (type === 'error') {
        this.loginForm.get('email')?.setErrors({ incorrect: true });
        this.loginForm.get('password')?.setErrors({ incorrect: true });
        this.setInvalidClass(this.loginForm.get('email'), this.loginForm.get('password'));
      }
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }
  }
}