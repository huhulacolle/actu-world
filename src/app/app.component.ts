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

  // recupère la langue selectionner par l'utilisateur 
  getLangPref(): void {
    this.appPref.fetch('lang').then(
      lang => {
        this.verifLangPref(lang);
      }
    );
  }

  // vérifie si l'app contient déjà en mémoire une langue par défaut, sinon la langue fr y est appliqué
  verifLangPref(lang: string): void {
    if (!lang) {
      this.appPref.store('lang', 'fr');
      window.location.assign('/');
    }
  }

  // lance le code au démarrage de l'application ou de la page
  // on pourrait passer par le constructeur, mais par convention sur Angular on passe par le ngOnInit
  ngOnInit() {
    this.getLangPref();
    this.news.getLangPreference();
  }

}
