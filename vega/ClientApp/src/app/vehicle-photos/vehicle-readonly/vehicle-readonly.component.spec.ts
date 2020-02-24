import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReadonlyComponent } from './vehicle-readonly.component';

describe('VehicleReadonlyComponent', () => {
  let component: VehicleReadonlyComponent;
  let fixture: ComponentFixture<VehicleReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
