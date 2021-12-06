/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { promise } from 'selenium-webdriver';

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
          .then(() => {
            // alert('bdd crée');
          })
          .catch(
            e => alert(JSON.stringify(e))
          );
      });
  }

  setProfil(nom: string, update: boolean): void {
    if (update) {
      this.db.executeSql('UPDATE users SET lastConnect = 0 WHERE lastConnect = 1', [])
        .catch(
          e => alert(JSON.stringify(e))
        );
    }

    this.db.executeSql('INSERT INTO users (nom, lastConnect) VALUES (?, 1)', [nom])
      .catch(
        e => alert(JSON.stringify(e))
      );
  }

  getUser(): Promise<any> {
    return this.db.executeSql('SELECT * FROM users WHERE LastConnect = 1', [])
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }

  getAllUser(): Promise<any> {
    return this.db.executeSql('SELECT * FROM users', [])
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }

}

