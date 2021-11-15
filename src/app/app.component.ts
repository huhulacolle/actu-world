import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'News', url: '/folder/Inbox', icon: 'paper' },
    { title: 'Favoris', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archive', url: '/folder/Archived', icon: 'archive' },
  ];
  constructor() {}
}
