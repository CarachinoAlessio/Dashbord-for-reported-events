import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTesiComponent } from './navbar-tesi.component';

describe('NavbarComponent', () => {
  let component: NavbarTesiComponent;
  let fixture: ComponentFixture<NavbarTesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
