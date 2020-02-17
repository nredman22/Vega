import { TestBed } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';

describe('Vehicle Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleService = TestBed.get(VehicleService);
    expect(service).toBeTruthy();
  });
});
