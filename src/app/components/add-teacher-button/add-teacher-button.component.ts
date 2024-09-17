import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-teacher-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-teacher-button.component.html',
  styleUrls: ['./add-teacher-button.component.scss']
})
export class AddTeacherButtonComponent {
  showForm = false;
  teacherForm: FormGroup;
  teacherFound = false;
  teacherId: number | null = null;
  teacherName: string | null = null; 
  showErrorModal = false;
  showSuccessModal = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.teacherForm = this.fb.group({
      id: [''],
      email: ['', Validators.email]
    });
  }

  searchTeacher() {
    const id = this.teacherForm.get('id')?.value;
    const email = this.teacherForm.get('email')?.value;

    if (!id && !email) {
      this.showErrorModal = true;
      this.errorMessage = 'Debe ingresar un ID o un correo de profesor.';
      return;
    }

    const searchCriteria = id ? `id=${id}` : `email=${email}`;

    this.http.get(`https://estramipyme-api.vercel.app/teachers?${searchCriteria}`).subscribe({
      next: (teachers: any) => {
        if (teachers.length === 0) {
          this.showErrorModal = true;
          this.errorMessage = 'No existe el profesor.';
          this.teacherFound = false;
          this.teacherId = null;
          this.teacherName = null;
        } else {
          this.teacherFound = true;
          this.teacherId = teachers[0].id;
          this.teacherName = teachers[0].name;  // Guardar el nombre del profesor
        }
      },
      error: () => {
        this.showErrorModal = true;
        this.errorMessage = 'Error al buscar el profesor.';
        this.teacherFound = false;
        this.teacherId = null;
        this.teacherName = null;
      }
    });
  }

  addTeacherToProject() {
    if (this.teacherId !== null) {
      this.http.patch(`https://estramipyme-api.vercel.app/teachers/${this.teacherId}`, { profesorParteProyecto: true }).subscribe({
        next: () => {
          this.showSuccessModal = true;
          this.teacherFound = false;
          this.teacherId = null;
          this.teacherForm.reset();
        },
        error: () => {
          alert('Error al agregar el profesor al proyecto');
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
    this.teacherName = null;
  }
}

  