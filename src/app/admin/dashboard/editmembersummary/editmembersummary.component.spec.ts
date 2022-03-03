import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmembersummaryComponent } from './editmembersummary.component';

describe('EditmembersummaryComponent', () => {
  let component: EditmembersummaryComponent;
  let fixture: ComponentFixture<EditmembersummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmembersummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmembersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
