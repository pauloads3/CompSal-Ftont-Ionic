import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharJogoPage } from './detalhar-jogo.page';

describe('DetalharJogoPage', () => {
  let component: DetalharJogoPage;
  let fixture: ComponentFixture<DetalharJogoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalharJogoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharJogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
