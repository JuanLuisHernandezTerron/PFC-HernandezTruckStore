import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCCAAComponent } from './input-ccaa.component';

describe('InputCCAAComponent', () => {
  let component: InputCCAAComponent;
  let fixture: ComponentFixture<InputCCAAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCCAAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCCAAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
