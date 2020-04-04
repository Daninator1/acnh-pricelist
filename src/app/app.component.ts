import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jsonEn from '../assets/i18n/en.json';
import jsonDe from '../assets/i18n/de.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acnh-pricelist';

  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/de|en/) ? browserLang : 'en');
  }
}
