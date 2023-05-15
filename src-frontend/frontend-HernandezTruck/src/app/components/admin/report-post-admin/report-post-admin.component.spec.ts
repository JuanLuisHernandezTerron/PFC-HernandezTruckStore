import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPostAdminComponent } from './report-post-admin.component';

describe('ReportPostAdminComponent', () => {
  let component: ReportPostAdminComponent;
  let fixture: ComponentFixture<ReportPostAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPostAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
