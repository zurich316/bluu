import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolModalReviewComponent } from './school-modal-review.component';

describe('SchoolModalReviewComponent', () => {
  let component: SchoolModalReviewComponent;
  let fixture: ComponentFixture<SchoolModalReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolModalReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolModalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
