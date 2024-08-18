import { Component, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-empresa.component.html',
  styleUrl: './boton-empresa.component.scss'
})
export class BotonEmpresaComponent {
  @Input()
  empresa:User|null=null

  constructor(private router:Router){}

  goPruebaDetails(empresa:any):void{
    this.router.navigate(['/prueba', empresa.id]);
  }
}
