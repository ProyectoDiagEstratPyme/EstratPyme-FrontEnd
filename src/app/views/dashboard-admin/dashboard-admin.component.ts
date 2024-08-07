import { Component } from '@angular/core';
import { AddStudentButtonComponent } from "../../add-student-button/add-student-button.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [AddStudentButtonComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

}
