import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketTabPage } from './create-ticket-tab.page';

describe('CreateTicketTabPage', () => {
  let component: CreateTicketTabPage;
  let fixture: ComponentFixture<CreateTicketTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTicketTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
