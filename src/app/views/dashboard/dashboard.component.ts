import { Component, Input, input, OnInit } from '@angular/core';
import { InfoSecComponent } from '../../components/info-sec/info-sec.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoSecComponent, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: User|null=null;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => {
        this.user=user
      }
    })
  }

}
