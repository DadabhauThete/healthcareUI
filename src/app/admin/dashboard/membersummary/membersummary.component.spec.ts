import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersummaryComponent } from './membersummary.component';

describe('MembersummaryComponent', () => {
  let component: MembersummaryComponent;
  let fixture: ComponentFixture<MembersummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
