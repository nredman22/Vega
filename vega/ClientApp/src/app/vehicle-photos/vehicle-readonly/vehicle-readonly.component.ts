import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-readonly',
  templateUrl: './vehicle-readonly.component.html',
  styleUrls: ['./vehicle-readonly.component.css']
})
export class VehicleReadonlyComponent implements OnInit {
  @Input() vehicle: Vehicle;

  constructor(private router: Router, private vehicleService: VehicleService) { }

  ngOnInit() {
  }

  edit() {
    this.router.navigate([`vehicles/${this.vehicle.id}/edit`]);
  }

  delete() {
    if(confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(this.vehicle).subscribe(result => console.log(result));
      this.router.navigate(['']);
    }
  }

}
