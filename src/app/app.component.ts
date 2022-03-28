import { Component, OnInit } from '@angular/core';
import { AppPreferences } from '@awesome-cordova-plugins/app-preferences/ngx';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'News', url: '/news', icon: 'document' },
    { title: 'Favoris', url: '/favorite', icon: 'heart' },
    { title: 'QRCode', url: '/qrcode', icon: 'qr-code' },
    { title: 'Paramètres', url: '/settings', icon: 'cog'}
  ];

  user: any;
  lang: string;

  constructor(
    private appPref: AppPreferences,
    private news: NewsService,
  ) {
    window.screen.orientation.lock('portrait');
  }

  getLangPref(): void {
    this.appPref.fetch('lang').then(
      lang => {
        this.verifLangPref(lang);
      }
    );
  }

  verifLangPref(lang: string): void {
    if (!lang) {
      this.appPref.store('lang', 'fr');
      window.location.assign('/');
    }
  }

  ngOnInit() {
    this.getLangPref();
    this.news.getLangPreference();
  }

}
