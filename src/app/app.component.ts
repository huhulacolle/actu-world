import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SqlService } from './sql.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public appPages = [
    { title: 'News', url: '/news', icon: 'document' },
    { title: 'Favoris', url: '/favorite', icon: 'heart' },
    { title: 'Recherche', url: '/search', icon: 'search' },
    { title: 'Profils', url: '/profils', icon: 'person-circle' },
  ];

  user: any;

  constructor(private sql: SqlService,
    private loadingController: LoadingController,
    private router: Router
    ) {}
  ngOnInit() {
    this.verification();
  }

  getUser(): void {
    this.sql.getUser().then((data) => {
      this.user = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.user.push(data.rows.item(i));
        }
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 3000
    });
    await loading.present();
  }

  verification(): void {
    this.presentLoading();
    setTimeout(() => {
      this.getUser();
      this.sql.getUser().then((data) => {
        if (!data.rows.length) {
          this.router.navigate(['connect']);
        }
      });
    }, 3000);

  }

}
