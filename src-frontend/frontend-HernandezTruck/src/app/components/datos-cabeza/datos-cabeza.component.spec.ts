import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCabezaComponent } from './datos-cabeza.component';

describe('DatosCabezaComponent', () => {
  let component: DatosCabezaComponent;
  let fixture: ComponentFixture<DatosCabezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosCabezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosCabezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
