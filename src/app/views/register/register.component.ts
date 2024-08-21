import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    typeUser: new FormControl('0', Validators.required),
    id: new FormControl('', Validators.required),
    sizeCompany: new FormControl('0', Validators.required),
    sector: new FormControl('0', Validators.required),
    sizeCompanyModal: new FormControl('0', Validators.required),
    sectorModal: new FormControl('0', Validators.required),
    typeUserModal: new FormControl('0', Validators.required)
  });

  errorMessage: string | null = null;
  isTypeUserModalOpen = false;
  isSizeCompanyModalOpen = false;
  isSectorModalOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const nameControl = this.registerForm.get('name') as AbstractControl;
    const emailControl = this.registerForm.get('email') as AbstractControl;
    const passwordControl = this.registerForm.get('password') as AbstractControl;
    const typeUserControl = this.registerForm.get('typeUser') as AbstractControl;
    const idControl = this.registerForm.get('id') as AbstractControl;
    const sizeCompanyControl = this.registerForm.get('sizeCompany') as AbstractControl;
    const sectorControl = this.registerForm.get('sector') as AbstractControl;

    if (sectorControl.value === "0" || sizeCompanyControl.value === "0" || typeUserControl.value === "0") {
      this.showMessage('Por favor, selecciona una opción.', 'error');
      return;
    }

    if (this.registerForm.valid) {
      const userData = { ...this.registerForm.value };
      this.authService.registerUser(userData).subscribe({
        next: response => {
          this.router.navigateByUrl("/login");
        },
        error: error => {
          console.error('Error al intentar registrar:', error);
          this.showMessage('Ocurrió un error al intentar registrar el usuario. Por favor, intenta nuevamente.', 'error');
        }
      });
    } else {
      this.showMessage('Formulario inválido. Por favor, revisa los campos.', 'error');
      this.setInvalidClass(nameControl, emailControl, passwordControl, typeUserControl, idControl, sizeCompanyControl, sectorControl);
    }
  }

  setInvalidClass(...controls: AbstractControl[]) {
    controls.forEach(control => {
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
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

  openTypeUserModal() {
    this.registerForm.get('typeUserModal')?.setValue('0'); // Reiniciar valor
    this.isTypeUserModalOpen = true;
  }

  closeTypeUserModal() {
    this.isTypeUserModalOpen = false;
  }

  confirmTypeUserAction() {
    const selectedValue = this.registerForm.get('typeUserModal')?.value;
    if (selectedValue) {
      this.registerForm.get('typeUser')?.setValue(selectedValue);
    }
    this.closeTypeUserModal();
  }

  openSizeCompanyModal() {
    this.registerForm.get('sizeCompanyModal')?.setValue('0'); // Reiniciar valor
    this.isSizeCompanyModalOpen = true;
  }

  closeSizeCompanyModal() {
    this.isSizeCompanyModalOpen = false;
  }

  confirmSizeCompanyAction() {
    const selectedValue = this.registerForm.get('sizeCompanyModal')?.value;
    if (selectedValue) {
      this.registerForm.get('sizeCompany')?.setValue(selectedValue);
    }
    this.closeSizeCompanyModal();
  }

  openSectorModal() {
    this.registerForm.get('sectorModal')?.setValue('0'); // Reiniciar valor
    this.isSectorModalOpen = true;
  }

  closeSectorModal() {
    this.isSectorModalOpen = false;
  }

  confirmSectorAction() {
    const selectedValue = this.registerForm.get('sectorModal')?.value;
    if (selectedValue) {
      this.registerForm.get('sector')?.setValue(selectedValue);
    }
    this.closeSectorModal();
  }
}
