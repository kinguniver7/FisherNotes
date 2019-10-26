import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SpinFishingComponent } from './components/spin-fishing/spin-fishing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreroomComponent } from './components/storeroom/storeroom.component';
// import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo  } from '@angular/fire/auth-guard';
import { AddRodComponent } from './components/storeroom/add/add-rod/add-rod.component';
import { AddReelOrEditComponent } from './components/storeroom/add/add-reel/add-reel-or-edit.component';
import { AddWobblerOrEditComponent } from './components/storeroom/add/add-wobbler/add-wobbler-or-edit.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthToLogin = () => redirectUnauthorizedTo(['sign-in']);

// tslint:disable:max-line-length
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'spin', component: SpinFishingComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom', component: StoreroomComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-rod', component: AddRodComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-rod/:id', component: AddRodComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-reel', component: AddReelOrEditComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-reel/:id', component: AddReelOrEditComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-wobbler', component: AddWobblerOrEditComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-wobbler/:id', component: AddWobblerOrEditComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'sign-in', component: SignInComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AngularFireAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
