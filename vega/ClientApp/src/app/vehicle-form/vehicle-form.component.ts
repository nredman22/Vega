import { Component, OnInit } from '@angular/core';
import { MakeService } from '../services/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  vehicle: any = {};

  constructor(private makeService: MakeService) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe(
      result => { this.makes = result as Array<any>; console.log(result); }, 
      error => { console.log(error); }
    );
  }

  onMakeChange() {
    console.log(this.vehicle.make);
    let selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models: [];
    console.log(this.models);
  }

}
