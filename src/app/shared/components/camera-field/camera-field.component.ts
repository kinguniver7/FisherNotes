import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-camera-field',
  templateUrl: './camera-field.component.html',
  styleUrls: ['./camera-field.component.scss']
})
export class CameraFieldComponent implements OnInit {
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  @Output() changedImage = new EventEmitter<string>();
  // for cropper
  imageBase64: any = null;
  @Input() croppedImage: any = null;

  @Input() height = 500;
  @Input() width = 500;

  public showCamera = false;
  public statusCamera: StatusCamera = StatusCamera.None;

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  constructor() { }

  ngOnInit() {
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.imageBase64 = webcamImage.imageAsDataUrl;
    this.statusCamera = StatusCamera.CropImage;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
      console.warn('Camera access was not allowed by user!');
    }
  }

  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.changedImage.emit(event.base64);
  }
  public imageLoaded() {
        // show cropper
  }
  public cropperReady() {
        // cropper ready
  }

  public loadImageFailed() {
    console.log('Load failed');
  }

  public onChangeStatus(status: StatusCamera) {
    this.statusCamera = status;
    if (status === StatusCamera.CropImage  && this.imageBase64 === null) {
      this.imageBase64 = this.croppedImage;
    }
  }

}


enum StatusCamera {
  None = 0,
  ShowCamera = 1,
  CropImage = 2
}