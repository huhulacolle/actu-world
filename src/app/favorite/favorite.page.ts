import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  users: any;
  content = false;

  constructor(private sql: SqlService) { }

  select(): void {
    alert(JSON.stringify(this.users));
  }

  testUser(): void {
    this.sql.testsql().then((data) => {
      this.users = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.users.push(data.rows.item(i));
        }
        this.content = true;
      }
    });
  }

  insertdb(): void {
    this.sql.testinsert();
  }

  ngOnInit() {
  }

}
