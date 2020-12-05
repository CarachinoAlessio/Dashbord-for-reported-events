import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTesiComponent } from './search-tesi.component';

describe('EventComponent', () => {
  let component: SearchTesiComponent;
  let fixture: ComponentFixture<SearchTesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTesiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
