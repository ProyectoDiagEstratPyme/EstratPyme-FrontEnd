import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherButtonComponent } from './add-teacher-button.component';

describe('AddTeacherButtonComponent', () => {
  let component: AddTeacherButtonComponent;
  let fixture: ComponentFixture<AddTeacherButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeacherButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeacherButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
