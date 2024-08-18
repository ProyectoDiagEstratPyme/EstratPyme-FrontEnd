import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from '../../models/test';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-prueba-details',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './prueba-details.component.html',
  styleUrl: './prueba-details.component.scss'
})
export class PruebaDetailsComponent implements OnInit{

  test:Test|null|undefined=null
  id:string=""

  form: FormGroup = new FormGroup({});
  currentStep = 1;
  totalSteps = 3;

  constructor(private router:Router,private dashboardService: DashboardService, private activatedRoute:ActivatedRoute,private fb:FormBuilder){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  ngOnInit(): void {
    this.dashboardService.getTestById(this.id).subscribe({
      next: (test) => {
        this.test=test
        this.initializeForm()
      }
    })

  }

  initializeForm() {
    this.form = this.fb.group({
      section1: this.fb.group({
        field1: [{ value: this.test?.pregunta1, disabled: true }, Validators.required],
        field2: [{ value: this.test?.pregunta2, disabled: true }, Validators.required],
        field3: [{ value: this.test?.pregunta3, disabled: true }, Validators.required]
      }),
      section2: this.fb.group({
        field4: [{ value: this.test?.pregunta4, disabled: true }, Validators.required],
        field5: [{ value: this.test?.pregunta5, disabled: true }, Validators.required],
        field6: [{ value: this.test?.pregunta6, disabled: true }, Validators.required],
      }),
      section3: this.fb.group({
        field7: [{ value: this.test?.pregunta7, disabled: true }, Validators.required],
        field8: [{ value: this.test?.pregunta8, disabled: true }, Validators.required],
        field9: [{ value: this.test?.pregunta9, disabled: true }, Validators.required],
      }),
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
    console.log(this.test?.pregunta1)
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goHome(){
    this.router.navigateByUrl("/pruebas-admin")
  }
}
