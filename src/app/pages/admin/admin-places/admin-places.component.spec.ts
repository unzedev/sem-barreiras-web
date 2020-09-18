import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlacesComponent } from './admin-places.component';

describe('AdminPlacesComponent', () => {
  let component: AdminPlacesComponent;
  let fixture: ComponentFixture<AdminPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
