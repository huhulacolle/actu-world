import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private news: NewsService,
    private router: Router,
    // private sql: SqlService
    ) { }

  ngOnInit() {
    this.getNews();
  }

  favoris(url: string, urlToImage: string, source: string, title: string, description: string): void {
    // console.log(url);
    // console.log(urlToImage);
    // console.log(source);
    // console.log(title);
    // console.log(description);
    // this.sql.setFav(url, urlToImage, source, title, description);
    alert('long press');
  }

  click(): void {
    alert('click');
  }

  refresh(event): void {
    setTimeout(() => {
      this.getNews();
      event.target.complete();
    }, 2000);
  }

  search(): void {
    this.router.navigate(['search']);
  }

  getNews(): void {
    this.news.getNews().subscribe(
      data => {
        this.articles = data.articles;
      });
      this.content = true;
  }
}
