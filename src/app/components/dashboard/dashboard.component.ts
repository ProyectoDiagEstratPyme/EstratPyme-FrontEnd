import { Component, Input, input, OnInit } from '@angular/core';
import { InfoSecComponent } from '../info-sec/info-sec.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoSecComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isModalVisible:boolean=false;
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
    if(this.user!.isTestDone){
      this.isModalVisible=true
    }else{
      this.router.navigateByUrl("/dashboard/test")
    }
    
  }

  goToEstado():void{
    this.router.navigateByUrl("/dashboard/estado-prueba")
  }

  closeModal():void{
    this.isModalVisible=false
  }

  goToTestModal():void{
    this.router.navigateByUrl("/dashboard/test")
  }
}
