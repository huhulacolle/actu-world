import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqlService } from '../sql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  tests: any;
  nom: string;
  missing = true;

  constructor(
    private sql: SqlService,
    private platform: Platform,
    private router: Router,
  ) {
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
    this.sql.setNom(this.nom);
  }

  connect(): void {
    // eslint-disable-next-line eqeqeq
    if (this.nom == '') {
      alert('faut mettre un nom');
    }
    else {
      this.insertsql();
      this.router.navigate(['']).then(() =>{
        window.location.reload();
      });
    }
  }

  selectsql(): void {
    this.sql.getUser().then((data) => {
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
