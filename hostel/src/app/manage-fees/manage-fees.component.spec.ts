import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeesComponent } from './manage-fees.component';

describe('ManageFeesComponent', () => {
  let component: ManageFeesComponent;
  let fixture: ComponentFixture<ManageFeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFeesComponent]
    });
    fixture = TestBed.createComponent(ManageFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
