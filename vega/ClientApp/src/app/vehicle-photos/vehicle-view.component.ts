import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css']
})
export class VehicleViewComponent implements OnInit {

  infoActive: boolean = true;
  vehicle: Vehicle = {
    id: 0,
    model: {
      id: 0,
      name: ''
    },
    make: {
      id: 0,
      name: ''
    },
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };

  constructor( private vehicleService: VehicleService, private route: ActivatedRoute) { 
      route.params.subscribe(p => this.vehicle.id = +p['id']);
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicle.id).subscribe(
      res => this.vehicle = res as Vehicle
    );
  }

  showInfo($event) {
    let src = $event.srcElement.id;

    if (src === 'photo')
      this.infoActive = false;
    else 
      this.infoActive = true;

    console.log($event);
    return false;
  }
}
