import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessFeedbackComponent } from './mess-feedback.component';

describe('MessFeedbackComponent', () => {
  let component: MessFeedbackComponent;
  let fixture: ComponentFixture<MessFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessFeedbackComponent]
    });
    fixture = TestBed.createComponent(MessFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
