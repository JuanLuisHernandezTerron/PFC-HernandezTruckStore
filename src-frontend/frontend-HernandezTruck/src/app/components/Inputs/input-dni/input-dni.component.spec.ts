import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDNIComponent } from './input-dni.component';

describe('InputDNIComponent', () => {
  let component: InputDNIComponent;
  let fixture: ComponentFixture<InputDNIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDNIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDNIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
