import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Article } from '../article';
import { NewsService } from '../news.service';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  articles: Article[];
  content = false;
  tests: any;

  constructor(
    private news: NewsService,
    private sql: SqlService,
    private router: Router,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.loading();
    this.getNews();
    this.verification();
    window.screen.orientation.lock('portrait');
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
      this.sql.selectsql().then((data) => {
        if (!data.rows.length) {
          this.router.navigate(['connect']);
        }
      });
    }, 3000);

  }

  refresh(event): void {
    setTimeout(() => {
      this.getNews();
      event.target.complete();
    }, 2000);
  }

  loading(): void {
    setTimeout(() => {
      this.content = true;
    }, 2000);
  }

  getNews(): void {
    this.news.getNews().subscribe(
      data => {
        this.articles = data.articles;
      });
  }
}
