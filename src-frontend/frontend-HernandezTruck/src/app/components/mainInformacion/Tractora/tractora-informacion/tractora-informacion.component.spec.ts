import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractoraInformacionComponent } from './tractora-informacion.component';

describe('TractoraInformacionComponent', () => {
  let component: TractoraInformacionComponent;
  let fixture: ComponentFixture<TractoraInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TractoraInformacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TractoraInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
