import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.page.html',
  styleUrls: ['./profils.page.scss'],
})
export class ProfilsPage implements OnInit {

  users: any;
  content = false;

  constructor(private sql: SqlService,  private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.loading();
    this.getUser();
  }

  getUser(): void {
    this.sql.getAllUser().then((data) => {
      this.users = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.users.push(data.rows.item(i));
        }
      }
    });
  }

  add(): void {
    this.router.navigate(['connect/false']);
  }

  loading(): void {
    setTimeout(() => {
      this.content = true;
    }, 500);
  }

}


