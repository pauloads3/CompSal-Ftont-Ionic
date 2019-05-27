import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumulasPage } from './sumulas.page';

describe('SumulasPage', () => {
  let component: SumulasPage;
  let fixture: ComponentFixture<SumulasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumulasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumulasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
