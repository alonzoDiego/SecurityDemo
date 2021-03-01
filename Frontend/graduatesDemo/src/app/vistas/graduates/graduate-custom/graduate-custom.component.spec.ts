import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateCustomComponent } from './graduate-custom.component';

describe('GraduateCustomComponent', () => {
  let component: GraduateCustomComponent;
  let fixture: ComponentFixture<GraduateCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
