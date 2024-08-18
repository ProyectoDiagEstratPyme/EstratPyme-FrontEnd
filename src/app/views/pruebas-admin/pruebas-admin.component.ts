import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BotonEmpresaComponent } from '../../components/boton-empresa/boton-empresa.component';
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pruebas-admin',
  standalone: true,
  imports: [NavbarComponent,BotonEmpresaComponent],
  templateUrl: './pruebas-admin.component.html',
  styleUrl: './pruebas-admin.component.scss'
})
export class PruebasAdminComponent implements OnInit {
  empresas:User[]=[]

  constructor(private dashboardService:DashboardService,private router:Router){}

  ngOnInit(): void {
    this.dashboardService.getUsersWithTestDone().subscribe({
      next: (empresas) => {
        this.empresas=empresas
      }
    })
  }

  goHome(){
    this.router.navigateByUrl("/dashboard-admin")
  }


}
