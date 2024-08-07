import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-button.component.html',
  styleUrl: './add-student-button.component.scss'
})
export class AddStudentButtonComponent {
  showForm = false;
  studentForm: FormGroup;
  studentFound = false;
  studentId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  searchStudent() {
    const id = this.studentForm.get('id')?.value;
    this.http.get(`http://localhost:3000/students/${id}`).subscribe({
      next: (student: any) => {
        this.studentFound = true;
        this.studentId = student.id;
      },
      error: () => {
        alert('No existe el estudiante');
        this.studentFound = false;
        this.studentId = null;
      }
    });
  }

  addStudentToProject() {
    if (this.studentId !== null) {
      this.http.patch(`http://localhost:3000/students/${this.studentId}`, { haceParteProyecto: true }).subscribe({
        next: () => {
          alert('Estudiante agregado al proyecto');
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
}

