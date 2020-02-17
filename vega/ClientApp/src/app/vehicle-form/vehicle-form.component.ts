import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: any = {};
  features: any[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(
      result => { this.makes = result as Array<any>; }, 
      error => { console.log(error); }
    );

    this.vehicleService.getFeatures().subscribe(
      result => { this.features = result as Array<any>; }, 
      error => { console.log(error); }
    );

  }

  onMakeChange() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models: [];
  }

}
