import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessNoticesComponent } from './mess-notices.component';

describe('MessNoticesComponent', () => {
  let component: MessNoticesComponent;
  let fixture: ComponentFixture<MessNoticesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessNoticesComponent]
    });
    fixture = TestBed.createComponent(MessNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
