import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SpinFishingComponent } from './components/spin-fishing/spin-fishing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreroomComponent } from './components/storeroom/storeroom.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: DashboardComponent },
  { path: 'spin', component: SpinFishingComponent },
  { path: 'storeroom', component: StoreroomComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
