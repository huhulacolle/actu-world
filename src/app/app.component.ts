import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'News', url: '/folder/Inbox', icon: 'paper' },
    { title: 'Favoris', url: '/favorite', icon: 'heart' },
    { title: 'Archive', url: '/archived', icon: 'archive' },
  ];
  constructor() {}
}
