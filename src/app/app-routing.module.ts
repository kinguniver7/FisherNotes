import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SpinFishingComponent } from './components/spin-fishing/spin-fishing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreroomComponent } from './components/storeroom/storeroom.component';
// import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo  } from '@angular/fire/auth-guard';
import { AddOrEditRodComponent } from './components/storeroom/add/add-or-edit-rod/add-or-edit-rod.component';
import { AddOrEditReelComponent } from './components/storeroom/add/add-or-edit-reel/add-or-edit-reel.component';
import { AddOrEditWobblerComponent } from './components/storeroom/add/add-or-edit-wobbler/add-or-edit-wobbler.component';
import { AddOrEditBaitComponent } from './components/storeroom/add/add-or-edit-bait/add-or-edit-bait.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthToLogin = () => redirectUnauthorizedTo(['sign-in']);

// tslint:disable:max-line-length
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'spin', component: SpinFishingComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom', component: StoreroomComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-rod', component: AddOrEditRodComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-rod/:id', component: AddOrEditRodComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-reel', component: AddOrEditReelComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-reel/:id', component: AddOrEditReelComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-wobbler', component: AddOrEditWobblerComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-wobbler/:id', component: AddOrEditWobblerComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-bait', component: AddOrEditBaitComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-bait/:id', component: AddOrEditBaitComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'sign-in', component: SignInComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AngularFireAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
