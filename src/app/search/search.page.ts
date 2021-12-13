import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  articles: any;
  content = false;
  constructor(private news: NewsService, private location: Location) { }

  ngOnInit() {
  }


  getSearch(q: string): void {
    this.news.getSearch(q).subscribe(
      data => {
        this.articles = data.articles;
      }
    );
    this.content = true;
  }

  back(): void {
    this.location.back();
  }


}
