/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntraGradesComponent } from './intra-grades.component';

describe('IntraGradesComponent', () => {
  let component: IntraGradesComponent;
  let fixture: ComponentFixture<IntraGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
