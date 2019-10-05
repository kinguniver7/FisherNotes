import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FisherNotes';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ru', 'uk']);
    translate.setDefaultLang('en');
    const currentLanguage = translate.getBrowserLang();
    translate.use(currentLanguage.match(/en|ru|uk/) ? currentLanguage : 'en');
}
}
