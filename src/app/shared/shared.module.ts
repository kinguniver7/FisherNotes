import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraFieldComponent } from '../shared/components/camera-field/camera-field.component';
import { FaModule } from './fa.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AngularMaterialModule } from './angular-material.module';

import {WebcamModule} from 'ngx-webcam';

@NgModule({
  declarations: [CameraFieldComponent],
  imports: [
    CommonModule,
    WebcamModule,
    FaModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ImageCropperModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  exports: [
    WebcamModule,
    CameraFieldComponent,
    FaModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ImageCropperModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class SharedModule { }
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}