import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SpinFishingComponent } from './components/spin-fishing/spin-fishing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreroomComponent } from './components/storeroom/storeroom.component';
//import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo  } from '@angular/fire/auth-guard';
import { RodAddComponent } from './components/storeroom/add/rod-add/rod-add.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthToLogin = () => redirectUnauthorizedTo(['sign-in']);

// tslint:disable:max-line-length
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'spin', component: SpinFishingComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom', component: StoreroomComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/add-rod', component: RodAddComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'storeroom/edit-rod/:id', component: RodAddComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthToLogin}},
  { path: 'sign-in', component: SignInComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AngularFireAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
