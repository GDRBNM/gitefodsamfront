import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuissieFormComponent } from './huissie-form.component';
import {expect} from "@angular/platform-browser/testing/src/matchers";
import {describe} from "@angular/core/testing/src/testing_internal";

describe('HuissieFormComponent', () => {
  let component: HuissieFormComponent;
  let fixture: ComponentFixture<HuissieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuissieFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuissieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
