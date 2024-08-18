import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-estado-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-prueba.component.html',
  styleUrl: './estado-prueba.component.scss'
})
export class EstadoPruebaComponent implements OnInit {

  user: User|null=null;
  estado_prueba:string=""
  isModalVisible:boolean=false

  constructor(private router:Router,private userService:UserService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => {
        this.user=user
      }
    })
    if (this.user!.isTestDone){
      this.estado_prueba="Realizada"
    }else{
      this.estado_prueba="Pendiente por realizar"
    }
  }

  goHome(){
    this.router.navigateByUrl("/dashboard")
  }

  openModal(){
    this.isModalVisible=true
  }

  closeModal(){
    this.isModalVisible=false
  }

}
