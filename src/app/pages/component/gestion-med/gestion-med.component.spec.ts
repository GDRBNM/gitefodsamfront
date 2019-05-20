import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMedComponent } from './gestion-med.component';

describe('GestionMedComponent', () => {
  let component: GestionMedComponent;
  let fixture: ComponentFixture<GestionMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
