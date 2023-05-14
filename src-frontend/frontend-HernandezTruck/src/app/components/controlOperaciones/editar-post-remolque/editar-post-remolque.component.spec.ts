import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPostRemolqueComponent } from './editar-post-remolque.component';

describe('EditarPostRemolqueComponent', () => {
  let component: EditarPostRemolqueComponent;
  let fixture: ComponentFixture<EditarPostRemolqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPostRemolqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPostRemolqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
