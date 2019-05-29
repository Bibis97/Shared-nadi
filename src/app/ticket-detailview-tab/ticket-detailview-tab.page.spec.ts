import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailviewTabPage } from './ticket-detailview-tab.page';

describe('TicketDetailviewTabPage', () => {
  let component: TicketDetailviewTabPage;
  let fixture: ComponentFixture<TicketDetailviewTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketDetailviewTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailviewTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
