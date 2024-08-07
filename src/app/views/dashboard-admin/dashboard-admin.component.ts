import { Component } from '@angular/core';
import { AddStudentButtonComponent } from "../../components/add-student-button/add-student-button.component";
import { AddTeacherButtonComponent } from "../../components/add-teacher-button/add-teacher-button.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [AddStudentButtonComponent, AddTeacherButtonComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

}
