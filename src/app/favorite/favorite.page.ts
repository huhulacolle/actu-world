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
  error = false;

  constructor(private sql: SqlService) { }

  ngOnInit() {
    this.getFav();
  }

  getFav(): void {
    this.sql.getFav().then((data) => {
      this.users = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.users.push(data.rows.item(i));
        }
        this.content = true;
      }
      else {
        // alert('rien');
        this.error = true;
      }
    });
  }
}
