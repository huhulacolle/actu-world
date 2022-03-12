/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  db: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private http: HttpClient
    )
    {
    this.sqlite.create({
      name: 'news.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        this.seedDatabase();
      }
      )
      .catch(
        e => alert(JSON.stringify(e))
      );
    }

  seedDatabase(): void {
    this.http.get('assets/script.sql', { responseType: 'text'})
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.db, sql)
          .catch(
            e => alert(JSON.stringify(e))
          );
      });
  }

  getFav(): Promise<any> {
    return this.db.executeSql('SELECT * FROM favoris ORDER BY id DESC', [])
      .then(res => res)
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  isFav(title: string): Promise<any> {
    return this.db.executeSql('SELECT * FROM favoris WHERE title = ?', [title])
      .then(res => res)
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  setFav(url: string, urlToImage: string, source: string, title: string, description: string, content: string): void {
    this.db.executeSql('INSERT INTO favoris (url, urlToImage, source, title, description, content) VALUES (?, ?, ?, ?, ?, ?);', [url, urlToImage, source, title, description, content])
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  deleteFav(title: string): void {
    this.db.executeSql('DELETE FROM favoris WHERE title = ?', [title])
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

  reset(): void  {
    this.db.executeSql('DELETE FROM FAVORIS', [])
      .catch(e => {
        alert(JSON.stringify(e));
      });
  }

}

