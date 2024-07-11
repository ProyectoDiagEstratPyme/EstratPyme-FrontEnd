import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSecComponent } from './info-sec.component';

describe('InfoSecComponent', () => {
  let component: InfoSecComponent;
  let fixture: ComponentFixture<InfoSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoSecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
