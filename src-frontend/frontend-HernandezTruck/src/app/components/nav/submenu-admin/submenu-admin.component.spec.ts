import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuAdminComponent } from './submenu-admin.component';

describe('SubmenuAdminComponent', () => {
  let component: SubmenuAdminComponent;
  let fixture: ComponentFixture<SubmenuAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
