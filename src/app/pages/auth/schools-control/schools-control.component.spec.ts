import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsControlComponent } from './schools-control.component';

describe('SchoolsControlComponent', () => {
  let component: SchoolsControlComponent;
  let fixture: ComponentFixture<SchoolsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
