import { Component, OnInit } from '@angular/core';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  favoris: any;
  error = false;

  constructor(private sql: SqlService) { }

  ngOnInit() {
    this.getFav();
  }

  getFav(): void {
    this.sql.getFav().then((data) => {
      this.favoris = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.favoris.push(data.rows.item(i));
        }
      }
      else {
        // alert('rien');
        this.error = true;
      }
    });
  }

  test(id: number): void {
    this.sql.deleteFav(id);
    this.favoris = null;
    this.getFav();
  }

}
