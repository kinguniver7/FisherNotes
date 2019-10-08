import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularMaterialModule } from './shared/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BackpackComponent } from './components/backpack/backpack.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SpinFishingComponent } from './components/spin-fishing/spin-fishing.component';
import { StoreroomComponent } from './components/storeroom/storeroom.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { FaModule } from './shared/fa.module';
import { StoreroomItemComponent } from './components/storeroom/storeroom-item/storeroom-item.component';

import { RodDetailDialogComponent } from './components/storeroom/detail/rod-detail-dialog/rod-detail-dialog.component';
import { ReelDetailDialogComponent } from './components/storeroom/detail/reel-detail-dialog/reel-detail-dialog.component';
import { WobblerDetailDialogComponent } from './components/storeroom/detail/wobbler-detail-dialog/wobbler-detail-dialog.component';
import { WobblerAddComponent } from './components/storeroom/add/wobbler-add/wobbler-add.component';
import { ReelAddComponent } from './components/storeroom/add/reel-add/reel-add.component';
import { RodAddComponent } from './components/storeroom/add/rod-add/rod-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BackpackComponent,
    SignInComponent,
    SignUpComponent,
    SpinFishingComponent,
    StoreroomComponent,
    StoreroomItemComponent,
    RodDetailDialogComponent,
    ReelDetailDialogComponent,
    WobblerDetailDialogComponent,
    WobblerAddComponent,
    ReelAddComponent,
    RodAddComponent
  ],
  imports: [
    BrowserModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FaModule
  ],
  entryComponents: [
    RodDetailDialogComponent,
    ReelDetailDialogComponent,
    WobblerDetailDialogComponent
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
