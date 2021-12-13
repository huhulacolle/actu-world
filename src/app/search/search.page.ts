import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  articles: any;
  content = false;
  constructor(private news: NewsService) { }

  ngOnInit() {
  }


  getSearch(q:string): void {
    this.news.getSearch(q).subscribe(
      data => {
        this.articles = data.articles;
      }
    )
    this.content = true;
  }


}
