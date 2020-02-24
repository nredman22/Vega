import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { observable, Observable, forkJoin } from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Array<any>;
  models: any[];
  vehicle: SaveVehicle = {
    id: 0,
    modelId: 0,
    makeId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };
  features: any[];

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router ) { 
      route.params.subscribe(p => this.vehicle.id = +p['id']);
    }

  ngOnInit() {
    let sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ]

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }

    forkJoin(sources).subscribe(res => {
      this.makes = res[0] as Array<any>;
      this.features = res[1] as Array<any>;
      if (this.vehicle.id) {
        this.setVehicle(res[2] as Vehicle);
        this.populateModels();
      }
    },  error => { 
      if (error.status === 404)
        this.router.navigate(['']);
      else  
        console.log(error); 
    });
  }
  
  private setVehicle(vehicle: Vehicle) {
    this.vehicle.id = vehicle.id;
    this.vehicle.makeId = vehicle.make.id;
    this.vehicle.modelId = vehicle.model.id;
    this.vehicle.isRegistered = vehicle.isRegistered;
    this.vehicle.contact = vehicle.contact;
    this.vehicle.features = vehicle.features.map(f => f.id);
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models: [];
  }

  onFeatureToggle(id, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(id);
    } else {
      this.vehicle.features.splice(this.vehicle.features.indexOf(id), 1);
    }
  }
  
  submit() {
    this.vehicle.modelId = parseInt(this.vehicle.modelId);
    
    if (!this.vehicle.id) {
      delete this.vehicle.id;
      this.vehicleService.createVehicle(this.vehicle).subscribe(result => console.log(result));
    } else {
      this.vehicleService.updateVehicle(this.vehicle).subscribe(result => console.log(result));
    }
  }

  deleteVehicle() {
    if(confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(this.vehicle).subscribe(result => console.log(result));
      this.router.navigate(['']);
    }
  }
}
