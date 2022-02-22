import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinsurancebenefitComponent } from './viewinsurancebenefit.component';

describe('ViewinsurancebenefitComponent', () => {
  let component: ViewinsurancebenefitComponent;
  let fixture: ComponentFixture<ViewinsurancebenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewinsurancebenefitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinsurancebenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
