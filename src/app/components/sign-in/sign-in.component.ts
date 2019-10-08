import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then(data => {
      this.router.navigate(['home']);
    });
  }

}
