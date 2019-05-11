import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesPage } from './times.page';

describe('TimesPage', () => {
  let component: TimesPage;
  let fixture: ComponentFixture<TimesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
