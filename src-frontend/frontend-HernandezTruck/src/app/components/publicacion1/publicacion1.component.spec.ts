import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Publicacion1Component } from './publicacion1.component';

describe('Publicacion1Component', () => {
  let component: Publicacion1Component;
  let fixture: ComponentFixture<Publicacion1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Publicacion1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Publicacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
