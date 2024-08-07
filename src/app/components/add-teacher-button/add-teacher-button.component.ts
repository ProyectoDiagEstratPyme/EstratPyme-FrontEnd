
  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-add-teacher-button',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-teacher-button.component.html',
  styleUrl: './add-teacher-button.component.scss'
    
  })
  export class AddTeacherButtonComponent {
    showForm = false;
    teacherForm: FormGroup;
    teacherFound = false;
    teacherId: number | null = null;
  
    constructor(private fb: FormBuilder, private http: HttpClient) {
      this.teacherForm = this.fb.group({
        id: ['', Validators.required]
      });
    }
  
    searchTeacher() {
      const id = this.teacherForm.get('id')?.value;
      this.http.get(`http://localhost:3000/teachers/${id}`).subscribe({
        next: (teacher: any) => {
          this.teacherFound = true;
          this.teacherId = teacher.id;
        },
        error: () => {
          alert('No existe el profesor');
          this.teacherFound = false;
          this.teacherId = null;
        }
      });
    }
  
    addTeacherToProject() {
      if (this.teacherId !== null) {
        this.http.patch(`http://localhost:3000/teachers/${this.teacherId}`, { profesorParteProyecto: true }).subscribe({
          next: () => {
            alert('Profesor agregado al proyecto');
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
  }
  