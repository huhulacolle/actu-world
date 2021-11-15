/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import NewsAPI from 'ts-newsapi';

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
    this.test();
  }

  async test(): Promise<void> {
    const newsAPI = new NewsAPI('73ce7275f8134bee9e9d0399d2ae3314');
    const sources = await newsAPI.getEverything({
      q: 'PS5',
      // qInTitle: 'stock',
      language: 'fr',
      sortBy: 'relevancy',
      pageSize: 20,
      page: 1,
  });
  console.log(typeof sources);
  }

}
