import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicle(id: Number) {
    return this.http.get(`/api/vehicles/${id}`);
  }

  getVehicles() {
    return this.http.get(`/api/vehicles`);
  }

  getMakes() {
    return this.http.get('/api/makes');
  }

  getFeatures() {
    return this.http.get('/api/features');
  }

  createVehicle(vehicle) {
    return this.http.post('/api/vehicles', vehicle);
  }

  updateVehicle(vehicle) {
    return this.http.put(`/api/vehicles/${vehicle.id}`, vehicle);
  }

  deleteVehicle(vehicle) {
    return this.http.delete(`/api/vehicles/${vehicle.id}`);
  }
}
