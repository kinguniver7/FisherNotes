import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { MatSidenav } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  

  isAuthenticated: any = false;
  loading = false;

  @ViewChild('avatar', {static: false}) avatar: ElementRef;
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
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
                this.router.events.subscribe((event: Event) => {
                  switch (true) {
                    case event instanceof NavigationStart: {
                      this.loading = true;
                      break;
                    }
                    case event instanceof NavigationEnd:
                    case event instanceof NavigationCancel:
                    case event instanceof NavigationError: {
                      this.loading = false;
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                });
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
        this.name.nativeElement.innerHTML = data.displayName;
        this.email.nativeElement.innerHTML = data.email;
      }
    } );
  }
  signOut() {
    this.afAuth.auth.signOut().then(data => {
      this.isAuthenticated = false;
      this.router.navigate(['sign-in']);

    });
  }

  closeSideNav() {
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

}
