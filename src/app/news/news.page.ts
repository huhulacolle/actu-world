/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private news: NewsService, private router: Router) { }

  ngOnInit() {
    this.loading();
    this.getNews();
  }

  refresh(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		this.router.navigate(['']);
  }

  loading(): void {
    setTimeout(() => {
      this.content = true;
    }, 3000);
  }

  getNews(): void {
    this.news.getNews().subscribe(
      data => {
        this.articles = data['articles'];
      });
  }

}
