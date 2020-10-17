import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordOneComponent } from './forgot-password-one.component';

describe('ForgotPasswordOneComponent', () => {
  let component: ForgotPasswordOneComponent;
  let fixture: ComponentFixture<ForgotPasswordOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
