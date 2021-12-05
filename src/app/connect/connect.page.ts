/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SqlService } from '../sql.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  tests: any;
  nom: string;
  already: boolean;

  constructor(
    private sql: SqlService,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.selectsql();
    this.route.params.subscribe(params => {
			this.already = JSON.parse(params['already']);
		});
    this.disableReturn();
  }

  setNom(nom: any): void {
    this.nom = nom;
    this.connect();
  }

  insertsql(): void {
    this.sql.setNom(this.nom);
  }

  disableReturn(): void {
    if (this.already == true) {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        // do nothing
        }
      );
    }
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

}
