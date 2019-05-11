import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharPage } from './detalhar.page';

describe('DetalharPage', () => {
  let component: DetalharPage;
  let fixture: ComponentFixture<DetalharPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalharPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
