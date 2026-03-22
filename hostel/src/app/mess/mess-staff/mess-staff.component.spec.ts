import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessStaffComponent } from './mess-staff.component';

describe('MessStaffComponent', () => {
  let component: MessStaffComponent;
  let fixture: ComponentFixture<MessStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessStaffComponent]
    });
    fixture = TestBed.createComponent(MessStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
