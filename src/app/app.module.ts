import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { SharedModule } from './shared/shared.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BackpackComponent } from './components/backpack/backpack.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SpinFishingComponent } from './components/spin-fishing/spin-fishing.component';
import { StoreroomComponent } from './components/storeroom/storeroom.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { StoreroomItemComponent } from './components/storeroom/storeroom-item/storeroom-item.component';

import { RodDetailDialogComponent } from './components/storeroom/detail/rod-detail-dialog/rod-detail-dialog.component';
import { ReelDetailDialogComponent } from './components/storeroom/detail/reel-detail-dialog/reel-detail-dialog.component';
import { WobblerDetailDialogComponent } from './components/storeroom/detail/wobbler-detail-dialog/wobbler-detail-dialog.component';
import { AddOrEditWobblerComponent } from './components/storeroom/add/add-or-edit-wobbler/add-or-edit-wobbler.component';
import { AddOrEditReelComponent } from './components/storeroom/add/add-or-edit-reel/add-or-edit-reel.component';
import { AddOrEditRodComponent } from './components/storeroom/add/add-or-edit-rod/add-or-edit-rod.component';
import { EnumKeysPipe } from './pipes/enum-keys.pipe';
import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { DialogAddBaitComponent } from './components/storeroom/add/dialog-add-bait/dialog-add-bait.component';
import { AddOrEditBaitComponent } from './components/storeroom/add/add-or-edit-bait/add-or-edit-bait.component';
import { from } from 'rxjs';

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
    ConfirmDialogComponent,

    AddOrEditWobblerComponent,
    AddOrEditReelComponent,
    AddOrEditRodComponent,
    EnumKeysPipe,
    LoaderComponent,
    DialogAddBaitComponent,
    AddOrEditBaitComponent
  ],
  imports: [
    BrowserModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features

    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    RodDetailDialogComponent,
    ReelDetailDialogComponent,
    WobblerDetailDialogComponent,
    ConfirmDialogComponent,
    DialogAddBaitComponent
  ],
  providers: [
    AngularFireAuthGuard,
    { provide: StorageBucket, useValue: 'photos' },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


