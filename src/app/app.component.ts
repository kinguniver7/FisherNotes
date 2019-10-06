import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private translate: TranslateService, private breakpointObserver: BreakpointObserver) {
    translate.addLangs(['en', 'ru', 'uk']);
    translate.setDefaultLang('en');
    const currentLanguage = translate.getBrowserLang();
    translate.use(currentLanguage.match(/en|ru|uk/) ? currentLanguage : 'en');
}
}
