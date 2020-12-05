import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTesiComponent } from './dashboard-tesi.component';

describe('DashboardComponent', () => {
  let component: DashboardTesiComponent;
  let fixture: ComponentFixture<DashboardTesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
