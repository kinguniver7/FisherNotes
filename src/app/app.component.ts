import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isAuthenticated: any = false;

  @ViewChild('avatar', {static: false}) avatar: ElementRef;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    user: Observable<firebase.User>;

  constructor(private translate: TranslateService,
              private breakpointObserver: BreakpointObserver,
              public afAuth: AngularFireAuth,
              private router: Router) {
    this.user = afAuth.authState;
   
    translate.addLangs(['en', 'ru', 'uk']);
    translate.setDefaultLang('en');
    const currentLanguage = translate.getBrowserLang();
    translate.use(currentLanguage.match(/en|ru|uk/) ? currentLanguage : 'en');
  }

  ngOnInit() {
    this.user.subscribe(data => {
      if (data && data.isAnonymous !== null) {
        this.isAuthenticated = !data.isAnonymous;
        // set avatar
        this.avatar.nativeElement.style.backgroundImage = 'url(' + data.photoURL + ')';
      }
    } );
  }
  signOut() {
    this.afAuth.auth.signOut().then(data => {
      this.isAuthenticated = false;
      this.router.navigate(['sign-in']);

    });
  }

}
