import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user: User|null=null;
  user_type:string=""
  user_size_company:string=""
  user_sector:string=""
  user_book:string=""

  constructor(private router:Router, private userService:UserService){}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: user => {
        this.user=user
      }
    })
    this.setTypeUser(this.user)
    this.setSizeCompany(this.user)
    this.setSector(this.user)
    this.setBook(this.user)
  }

  setTypeUser(user:User|null):void{
    if(user?.typeUser){
      if(user.typeUser===1 || user.typeUser==="1"){
        this.user_type="Natural"
      }
      if(user.typeUser===2 || user.typeUser==="2"){
        this.user_type="Jurídica"
      }
    }
  }

  setSizeCompany(user:User|null):void{
    if(user?.sizeCompany){
      if(user.sizeCompany===1 || user.sizeCompany==="1"){
        this.user_size_company="Micro"
      }
      if(user.sizeCompany===2 || user.sizeCompany==="2"){
        this.user_size_company="Pequeña"
      }
      if(user.sizeCompany===3 || user.sizeCompany==="3"){
        this.user_size_company="Mediana"
      }
      if(user.sizeCompany===4 || user.sizeCompany==="4"){
        this.user_size_company="Grande"
      }
    }
  }

  setSector(user:User|null):void{
    if(user?.sector){
      if(user.sector===1 || user.sector==="1"){
        this.user_sector="Agrícola"
      }
      if(user.sector===2 || user.sector==="2"){
        this.user_sector="Industrial"
      }
      if(user.sector===3 || user.sector==="3"){
        this.user_sector="Servicios"
      }
      if(user.sector===4 || user.sector==="4"){
        this.user_sector="Construcción"
      }
    }
  }

  setBook(user:User|null):void{
    if(user?.isBookDonwloaded!=null){
      if(user.isBookDonwloaded===true){
        this.user_book="Sí"
      }
      if(user.isBookDonwloaded===false){
        this.user_book="No"
      }
  }
  }

  goHome(){
    this.router.navigateByUrl("/dashboard")
  }

}
