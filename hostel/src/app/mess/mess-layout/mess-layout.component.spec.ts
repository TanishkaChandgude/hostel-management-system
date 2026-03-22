import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessLayoutComponent } from './mess-layout.component';

describe('MessLayoutComponent', () => {
  let component: MessLayoutComponent;
  let fixture: ComponentFixture<MessLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessLayoutComponent]
    });
    fixture = TestBed.createComponent(MessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
