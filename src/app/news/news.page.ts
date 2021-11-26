import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  articles: Article[];
  content = false;

  constructor(private news: NewsService) { }

  ngOnInit() {
    this.loading();
    this.getNews();
    window.screen.orientation.lock('portrait');
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
