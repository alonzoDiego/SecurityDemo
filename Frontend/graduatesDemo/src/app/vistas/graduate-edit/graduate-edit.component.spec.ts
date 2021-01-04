import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateEditComponent } from './graduate-edit.component';

describe('GraduateEditComponent', () => {
  let component: GraduateEditComponent;
  let fixture: ComponentFixture<GraduateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
