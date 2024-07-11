import { Component, Input, input } from '@angular/core';
import { InfoSecComponent } from '../../components/info-sec/info-sec.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoSecComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  

}
