import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-button.component.html',
  styleUrls: ['./add-student-button.component.scss']
})
export class AddStudentButtonComponent {
  showForm = false;
  studentForm: FormGroup;
  studentFound = false;
  studentId: number | null = null;
  studentName: string | null = null;
  showErrorModal = false;
  showSuccessModal = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      id: [''],
      email: ['', Validators.email]
    });
  }

  searchStudent() {
    const id = this.studentForm.get('id')?.value;
    const email = this.studentForm.get('email')?.value;

    if (!id && !email) {
      this.showErrorModal = true;
      this.errorMessage = 'Debe ingresar un ID o un correo de estudiante.';
      return;
    }

    const searchCriteria = id ? `id=${id}` : `email=${email}`;

    this.http.get(`https://estramipyme-api.vercel.app/students?${searchCriteria}`).subscribe({
      next: (students: any) => {
        if (students.length === 0) {
          this.showErrorModal = true;
          this.errorMessage = 'No existe el estudiante.';
          this.studentFound = false;
          this.studentId = null;
          this.studentName = null;
        } else {
          this.studentFound = true;
          this.studentId = students[0].id;
          this.studentName = students[0].name;  // Guardar el nombre del estudiante
        }
      },
      error: () => {
        this.showErrorModal = true;
        this.errorMessage = 'Error al buscar el estudiante.';
        this.studentFound = false;
        this.studentId = null;
        this.studentName = null;
      }
    });
  }

  addStudentToProject() {
    if (this.studentId !== null) {
      this.http.patch(`https://estramipyme-api.vercel.app/students/${this.studentId}`, { haceParteProyecto: true }).subscribe({
        next: () => {
          this.showSuccessModal = true;
          this.studentFound = false;
          this.studentId = null;
          this.studentForm.reset();
        },
        error: () => {
          alert('Error al agregar el estudiante al proyecto');
        }
      });
    }
  }

  closeErrorModal() {
    this.showErrorModal = false;
    this.errorMessage = '';
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }
}
