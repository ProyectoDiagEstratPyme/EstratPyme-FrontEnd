import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  currentStep = 1;
  totalSteps = 3;

  constructor (private router:Router,private fb: FormBuilder){}

  

  ngOnInit() {
    this.form = this.fb.group({
      section1: this.fb.group({
        field1: ['', Validators.required],
        field2: ['', Validators.required],
        field3: ['', Validators.required]
      }),
      section2: this.fb.group({
        field4: ['', Validators.required],
        field5: ['', Validators.required],
        field6: ['', Validators.required],
      }),
      section3: this.fb.group({
        field7: ['', Validators.required],
        field8: ['', Validators.required],
        field9: ['', Validators.required],
      }),
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      // Perform the form submission logic
    } else {
      console.log('Form is not valid');
      // Handle validation errors
    }
  }


  goHome(){
    this.router.navigateByUrl("/dashboard")
  }

}
