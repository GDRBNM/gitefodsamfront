import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientMedComponent } from './detail-client-med.component';

describe('DetailClientMedComponent', () => {
  let component: DetailClientMedComponent;
  let fixture: ComponentFixture<DetailClientMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailClientMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClientMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
