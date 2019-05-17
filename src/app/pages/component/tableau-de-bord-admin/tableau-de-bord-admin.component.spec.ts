import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDeBordAdminComponent } from './tableau-de-bord-admin.component';

describe('TableauDeBordAdminComponent', () => {
  let component: TableauDeBordAdminComponent;
  let fixture: ComponentFixture<TableauDeBordAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauDeBordAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauDeBordAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
