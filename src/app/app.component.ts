import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import jsonEn from '../assets/i18n/en.json';
import jsonDe from '../assets/i18n/de.json';
import { ItemParserService } from './services/itemparser/itemparser.service';
import { UserSettingsService } from './services/usersettings/usersettings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acnh-pricelist';
  south = false;

  constructor(public parser: ItemParserService, public translate: TranslateService, public userSettings: UserSettingsService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    const savedLanguage = this.userSettings.savedLanguage;

    if (savedLanguage) {
      translate.use(savedLanguage);
    } else {
      translate.use(browserLang.match(/de|en/) ? browserLang : translate.defaultLang);
      this.userSettings.savedLanguage = translate.currentLang;
    }

    const savedSouth = this.userSettings.savedSouth;

    if (savedSouth !== null) {
      this.south = savedSouth;
    } else {
      this.south = false;
      userSettings.savedSouth = this.south;
    }
  }

  public changeLanguage(value: string) {
    this.userSettings.savedLanguage = value;
    this.translate.use(value);
  }

  public changeSouth(value: any) {
    this.userSettings.savedSouth = value.checked;
    this.south = value.checked;
  }
}
