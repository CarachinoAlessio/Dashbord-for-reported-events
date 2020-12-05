import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTesiComponent } from './sidebar-tesi.component';

describe('SidebarComponent', () => {
  let component: SidebarTesiComponent;
  let fixture: ComponentFixture<SidebarTesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
