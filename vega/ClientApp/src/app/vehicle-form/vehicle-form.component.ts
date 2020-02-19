import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Array<any>;
  models: any[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  features: any[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(
      result => { this.makes = result as Array<any>; }, 
      error => { console.log(error); }
    );

    this.vehicleService.getFeatures().subscribe(
      result => { this.features = result as Array<number>; }, 
      error => { console.log(error); }
    );

  }

  onMakeChange() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models: [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(id, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      this.vehicle.features.splice(this.vehicle.features.indexOf(id), 1);
    }
  }
  
  submit() {
    this.vehicle.isRegistered = (this.vehicle.isRegistered === 'true') ? true : false;
    this.vehicle.modelId = parseInt(this.vehicle.modelId);
    console.log(this.vehicle, this.vehicle.modelId)
    this.vehicleService.createVehicle(this.vehicle).subscribe(result => console.log(result));
    // console.log(this.vehicle);
  }
}
