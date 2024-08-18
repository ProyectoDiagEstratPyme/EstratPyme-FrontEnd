import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPruebaComponent } from './estado-prueba.component';

describe('EstadoPruebaComponent', () => {
  let component: EstadoPruebaComponent;
  let fixture: ComponentFixture<EstadoPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoPruebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
