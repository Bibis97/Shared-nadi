import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketstabPage } from './tickets-tab.page';

describe('Tab1Page', () => {
  let component: TicketstabPage;
  let fixture: ComponentFixture<TicketstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketstabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
