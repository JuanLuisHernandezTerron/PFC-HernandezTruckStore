import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosRemolqueComponent } from './datos-remolque.component';

describe('DatosRemolqueComponent', () => {
  let component: DatosRemolqueComponent;
  let fixture: ComponentFixture<DatosRemolqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosRemolqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosRemolqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
