/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  articles: any;
  test2: number[] = [];

  constructor(private news: NewsService) { }

  ngOnInit() {
    this.test();
    this.test22();
  }

  test22() {
    for (let i = 0; i < 25; i++) {
      this.test2[i] = i ;
    }
  }

  test() {
    return this.news.getData('everything?q=tesla&language=fr&').subscribe(
      data => {
        this.articles = data;
        console.log(this.articles);
      }
    );
  }

}
