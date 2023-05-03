import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiremolqueInformacionComponent } from './semiremolque-informacion.component';

describe('SemiremolqueInformacionComponent', () => {
  let component: SemiremolqueInformacionComponent;
  let fixture: ComponentFixture<SemiremolqueInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemiremolqueInformacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemiremolqueInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
