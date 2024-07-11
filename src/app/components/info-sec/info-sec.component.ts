import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-sec',
  standalone: true,
  imports: [],
  templateUrl: './info-sec.component.html',
  styleUrl: './info-sec.component.scss'
})
export class InfoSecComponent {
  @Input() cardTitle: string =''

}
