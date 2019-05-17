import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MEDFORMComponent } from './med-form.component';
import {expect} from "@angular/platform-browser/testing/src/matchers";
import {describe} from "@angular/core/testing/src/testing_internal";

describe('MEDFORMComponent', () => {
  let component: MEDFORMComponent;
  let fixture: ComponentFixture<MEDFORMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MEDFORMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MEDFORMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
