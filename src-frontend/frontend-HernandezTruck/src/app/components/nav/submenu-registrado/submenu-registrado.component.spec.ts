import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuRegistradoComponent } from './submenu-registrado.component';

describe('SubmenuRegistradoComponent', () => {
  let component: SubmenuRegistradoComponent;
  let fixture: ComponentFixture<SubmenuRegistradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuRegistradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
