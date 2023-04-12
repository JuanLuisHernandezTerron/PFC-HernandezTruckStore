import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTelefonoComponent } from './input-telefono.component';

describe('InputTelefonoComponent', () => {
  let component: InputTelefonoComponent;
  let fixture: ComponentFixture<InputTelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
