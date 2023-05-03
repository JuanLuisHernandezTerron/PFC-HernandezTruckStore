import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDetalladoComponent } from './register-detallado.component';

describe('RegisterDetalladoComponent', () => {
  let component: RegisterDetalladoComponent;
  let fixture: ComponentFixture<RegisterDetalladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDetalladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
