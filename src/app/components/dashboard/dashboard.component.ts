import { Component, Input, input, OnInit } from '@angular/core';
import { InfoSecComponent } from '../info-sec/info-sec.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoSecComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: User|null=null;

  constructor(private userService:UserService,private router: Router){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => {
        this.user=user
      }
    })
  }

  goToTest():void{
    this.router.navigateByUrl("/dashboard/test")
  }

}
