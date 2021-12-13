/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
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

  testinsert(): void {
    this.db.executeSql("INSERT INTO favoris VALUES ('Delphine DE FREITAS, à Caen', 'SHOW - Elles sont 29 candidates pour une couronne. Les prétendantes au titre de reine de beauté des Français se retrouvent ce samedi 11 décembre dès 21h05 en direct sur TF1 pour une cérémonie placée sous le signe des comédies musicales. LCI vous fait vivre le…', 'Www.lci.fr', 'EN DIRECT - Miss France 2022 : qui va succéder à Amandine Petit ? Suivez l événement avec nous - LCI', 'https://www.lci.fr/culture/direct-video-miss-france-2022-sur-tf1-favorites-gagnante-portraits-photos-qui-succedera-a-amandine-petit-2204286.html', 'https://photos.lci.fr/images/1280/720/miss-france-2022-roi-lion-8b735d-0@1x.jpeg');", [])
    .catch(
      e => alert(JSON.stringify(e))
    );
  }

  testsql(): Promise<any> {
    return this.db.executeSql('SELECT * FROM favoris', [])
      .then((res) => {
        return res;
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }

}

