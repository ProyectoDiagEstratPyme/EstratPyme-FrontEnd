import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showMobileMenu: boolean = false;

  constructor(private router: Router){

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
    return this.router.url === "/dashboard"
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
    /* falta agregar logica para indicar a la pagina
    que ya fue deslogueado */

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


}
