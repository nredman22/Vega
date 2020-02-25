import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-photo',
  templateUrl: './vehicle-photo.component.html',
  styleUrls: ['./vehicle-photo.component.css']
})
export class VehiclePhotoComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @ViewChild('fileInput', {static: true}) file: ElementRef;
  photos: any[];
  uploading: boolean = false;
  uploadComplete: boolean = false;
  uploadProgress: number;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getPhotos(this.vehicle.id).subscribe(
      res => this.photos = res as any[],
      error => console.log(error)
    );
  }

  uploadPhoto() {
    this.uploading = true;
    this.uploadComplete = false;
    let nativeElement = this.file.nativeElement;
    this.vehicleService.uploadPhoto(this.vehicle.id, nativeElement.files[0]).subscribe(
      (response) => {
        // Via this API, you get access to the raw event stream.
        // Look for upload progress events.
        if (response.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * response.loaded / response.total);
          this.uploadProgress = percentDone;
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (response instanceof HttpResponse) {
          console.log(response.body);
          this.photos.push(response.body);
          console.log('File is completely uploaded!');
        }
      },
      error => console.log("error : ", error),
      () => { 
        this.uploadComplete = true;
        this.uploading = false;
      }
    );
  }

}
