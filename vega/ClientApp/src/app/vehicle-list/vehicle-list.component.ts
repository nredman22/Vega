import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle, KeyValuePair } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor( private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(
      res => this.makes = res as KeyValuePair[],
      error => console.log(error)
    );

    this.vehicleService.getVehicles().subscribe(
      res => this.vehicles = this.allVehicles = res as Vehicle[],
      error => console.log(error)
    )
  }

  onFilterChange() {
    var vehicles = this.allVehicles;

    if (this.filter.makeId) 
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    this.vehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.vehicles = this.allVehicles;
  }


}
