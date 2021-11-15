/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // this.test();
  }

  // NewsAPI = require('newsapi');
  // newsapi = new this.NewsAPI('73ce7275f8134bee9e9d0399d2ae3314');

  // newsAPI = new NewsAPI('api_key')

  test(): void {
      // All options passed to topHeadlines are optional, but you need to include at least one of them
  // this.newsapi.v2.topHeadlines({
  //   sources: 'bbc-news,the-verge',
  //   q: 'bitcoin',
  //   category: 'business',
  //   language: 'en',
  //   country: 'us'
  // }).then(response => {
  //   console.log(response);
  //   /*
  //     {
  //       status: "ok",
  //       articles: [...]
  //     }
  //   */
  // });
  }

}
