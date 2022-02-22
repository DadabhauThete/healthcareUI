import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinsurancebenefitComponent } from './addinsurancebenefit.component';

describe('AddinsurancebenefitComponent', () => {
  let component: AddinsurancebenefitComponent;
  let fixture: ComponentFixture<AddinsurancebenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinsurancebenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinsurancebenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
