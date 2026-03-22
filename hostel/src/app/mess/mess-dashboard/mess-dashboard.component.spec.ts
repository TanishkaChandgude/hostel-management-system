import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessDashboardComponent } from './mess-dashboard.component';

describe('MessDashboardComponent', () => {
  let component: MessDashboardComponent;
  let fixture: ComponentFixture<MessDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessDashboardComponent]
    });
    fixture = TestBed.createComponent(MessDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
