import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  articles: any;
  test2: number[] = [];

  constructor(private news: NewsService, private router: Router) { }

  ngOnInit() {
    this.test();
    this.test22();
  }

  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		this.router.navigate(['']);
  }

  test22() {
    for (let i = 0; i < 25; i++) {
      this.test2[i] = i ;
    }
  }

  test() {
    return this.news.getData('top-headlines?country=fr&language=fr&').subscribe(
      data => {
        this.articles = data;
        console.log(this.articles);
      }
    );
  }

}
