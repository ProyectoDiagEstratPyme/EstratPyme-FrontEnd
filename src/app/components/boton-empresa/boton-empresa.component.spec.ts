import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonEmpresaComponent } from './boton-empresa.component';

describe('BotonEmpresaComponent', () => {
  let component: BotonEmpresaComponent;
  let fixture: ComponentFixture<BotonEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
