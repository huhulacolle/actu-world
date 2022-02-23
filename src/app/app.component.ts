import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'News', url: '/news', icon: 'document' },
    { title: 'Favoris', url: '/favorite', icon: 'heart' },
    { title: 'QRCode', url: '/qrcode', icon: 'qr-code' },
    { title: 'Paramètres', url: '/settings', icon: 'cog'}
  ];

  user: any;

  constructor() {
    window.screen.orientation.lock('portrait');
  }

}
