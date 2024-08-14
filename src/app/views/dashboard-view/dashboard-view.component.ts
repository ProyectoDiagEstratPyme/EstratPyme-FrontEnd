import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss'
})
export class DashboardViewComponent {

}
