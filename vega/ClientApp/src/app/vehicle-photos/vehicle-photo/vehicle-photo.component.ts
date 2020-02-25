import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-vehicle-photo',
  templateUrl: './vehicle-photo.component.html',
  styleUrls: ['./vehicle-photo.component.css']
})
export class VehiclePhotoComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @ViewChild('fileInput', {static: true}) file: ElementRef;
  photos: any[];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getPhotos(this.vehicle.id).subscribe(
      res => this.photos = res as any[],
      error => console.log(error)
    );
  }

  uploadPhoto() {
    let nativeElement = this.file.nativeElement;
    this.vehicleService.uploadPhoto(this.vehicle.id, nativeElement.files[0]).subscribe(res => this.photos.push(res));
  }

}
