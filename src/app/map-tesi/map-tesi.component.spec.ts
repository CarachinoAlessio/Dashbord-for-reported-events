import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapTesiComponent} from './map-tesi.component';

describe('MapsComponent', () => {
  let component: MapTesiComponent;
  let fixture: ComponentFixture<MapTesiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTesiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
