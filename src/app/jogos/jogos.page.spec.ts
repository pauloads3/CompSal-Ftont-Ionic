import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogosPage } from './jogos.page';

describe('JogosPage', () => {
  let component: JogosPage;
  let fixture: ComponentFixture<JogosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
