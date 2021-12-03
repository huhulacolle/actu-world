/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
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
          .then(() => {
            // alert('bdd crée');
          })
          .catch(
            e => alert(JSON.stringify(e))
          );
      });
  }

  setNom(nom: string): void {
    this.db.executeSql('INSERT INTO user (nom, lastConnect) VALUES (?, 1)', [nom])
      .catch(
        e => alert(JSON.stringify(e))
      );
  }

  getUser() {
    return this.db.executeSql('SELECT * FROM USER WHERE lastConnect = 1', [])
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }

  getAllUser() {
    return this.db.executeSql('SELECT * FROM USER', [])
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }

}

