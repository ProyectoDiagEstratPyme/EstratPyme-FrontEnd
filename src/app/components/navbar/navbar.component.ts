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


}
