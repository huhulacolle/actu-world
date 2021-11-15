/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  api_key = '73ce7275f8134bee9e9d0399d2ae3314';
  test: Array<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.data().subscribe(
      data => this.test = data['articles']
      );
  }

  data() {
    const test = this.http.get('https://newsapi.org/v2/sources?language=fr&apiKey=' + this.api_key);
    console.log(test);
    return test;
  }
}
