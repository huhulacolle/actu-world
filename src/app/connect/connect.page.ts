import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqlService } from '../sql.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  tests: any;
  nom: string;

  constructor(private sql: SqlService, private platform: Platform, private location: Location) {
    this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
      }
    );
  }

  setNom(nom: any): void {
    this.nom = nom;
    this.connect();
  }

  testsql(): void {
    this.sql.seedDatabase();
  }

  insertsql(): void {
    this.sql.insertNom(this.nom);
  }

  connect(): void {
    this.insertsql();
    this.location.back();
  }

  selectsql(): void {
    this.sql.selectsql().then((data) => {
      this.tests = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.tests.push(data.rows.item(i));
        }
      }
    });
  }


  ngOnInit() {
    this.selectsql();
  }

}
