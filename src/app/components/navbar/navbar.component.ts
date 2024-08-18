import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SettingComponent } from '../setting/setting.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,SettingComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showMobileMenu: boolean = false;

  constructor(private router: Router,private authService: AuthService){

  }
  toggleMobileMenu(): void {
      this.showMobileMenu = !this.showMobileMenu;
  }

  isRegisterRoute():boolean{
    return this.router.url === "/register"
  }

  isLoginRoute():boolean{
    return this.router.url === "/login"
  }

  isDashBoardRoute():boolean{
    return this.router.url === "/dashboard" || this.router.url === "/dashboard/profile" || this.router.url ==="/dashboard/test" || this.router.url ==="/dashboard/estado-prueba"
  }

  isDashBoardAdmin():boolean{
    return this.router.url==="/dashboard-admin" || this.router.url==="/pruebas-admin" || /^\/prueba\/\d+/.test(this.router.url);
  }

  isHelpUserRoute():boolean{
    return this.router.url === "/help-user"
  }

  isLandingPageRoute():boolean{
    return this.router.url === "/landing-page"
  }


  registrarseCondition():boolean{
    return this.isLoginRoute() || this.isLandingPageRoute() || this.isHelpUserRoute()
  }

  iniciarSesionCondition():boolean{
    return this.isRegisterRoute()|| this.isLandingPageRoute()
  }

  cerrarSesion():void{
    this.authService.isLoggedIn=false;

    this.router.navigateByUrl('/login');
  }
  
  registrarse():void{
    this.router.navigateByUrl('/register');
  }

  iniciarSesion():void{
    this.router.navigateByUrl('/login');
  }

  goLandingPage():void{
    this.router.navigateByUrl("/landing-page")
  }

  goInicioDashboard():void{
    this.router.navigateByUrl("/dashboard")
  }
  goInicioDashboardMobile():void{
    this.router.navigateByUrl("/dashboard")
    this.toggleMobileMenu()
  }

  goPerfilUser():void{
    this.router.navigateByUrl("/dashboard/profile")
  }

  goPerfilUserMobile():void{
    this.router.navigateByUrl("/dashboard/profile")
    this.toggleMobileMenu()
  }

  goPruebas():void{
    this.router.navigateByUrl("/pruebas-admin")
  }


}
