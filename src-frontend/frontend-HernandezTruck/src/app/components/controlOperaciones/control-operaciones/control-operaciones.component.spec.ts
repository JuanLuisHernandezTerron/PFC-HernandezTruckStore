import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlOperacionesComponent } from './control-operaciones.component';

describe('ControlOperacionesComponent', () => {
  let component: ControlOperacionesComponent;
  let fixture: ComponentFixture<ControlOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
