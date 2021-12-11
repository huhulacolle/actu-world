import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  favoris: Article[];

  constructor(private sql: SqlService) { }

  testbd(): void {
    this.sql.testsql()
      .then(data => {
        this.favoris = data;
      })
      .catch(e => {
        alert(JSON.stringify(e));
      });
      alert(this.favoris);
  }

  ngOnInit() {
  }

}
