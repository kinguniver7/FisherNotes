import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserApp } from '../core/interfaces/user-app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserApp;
  constructor(
    private afAuth: AngularFireAuth) {
      const currentUser = afAuth.auth.currentUser;
      this.user = {
        id: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL
      };
  }

  public getCurrentUser(): UserApp {
    return this.user;
  }
}
