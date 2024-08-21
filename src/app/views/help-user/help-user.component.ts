import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-help-user',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './help-user.component.html',
  styleUrls: ['./help-user.component.scss']
})
export class HelpUserComponent {
  helpForm = new FormGroup({
    tipoEmpresa: new FormControl('', Validators.required),
    actividadNegocio: new FormControl('', Validators.required),
    numeroEmpleados: new FormControl('', Validators.required),
    ingresosAnuales: new FormControl('', Validators.required),
  });

  isModalOpen = false;
  warningMessage: string | null = null;

  constructor(private router: Router) {}

  openConfirmationModal() {
    if (this.helpForm.invalid) {
      this.warningMessage = 'Todavía faltan campos por llenar. ¿Desea enviar el formulario así?';
    } else {
      this.warningMessage = null;
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmSubmission() {
    const formData = this.helpForm.value;
    this.router.navigate(['/register'], { queryParams: formData });
  }
}
