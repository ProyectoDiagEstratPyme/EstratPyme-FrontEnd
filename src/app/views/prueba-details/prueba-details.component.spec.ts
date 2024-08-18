import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaDetailsComponent } from './prueba-details.component';

describe('PruebaDetailsComponent', () => {
  let component: PruebaDetailsComponent;
  let fixture: ComponentFixture<PruebaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
