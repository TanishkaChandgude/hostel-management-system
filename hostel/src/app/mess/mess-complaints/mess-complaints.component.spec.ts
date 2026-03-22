import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessComplaintsComponent } from './mess-complaints.component';

describe('MessComplaintsComponent', () => {
  let component: MessComplaintsComponent;
  let fixture: ComponentFixture<MessComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessComplaintsComponent]
    });
    fixture = TestBed.createComponent(MessComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
