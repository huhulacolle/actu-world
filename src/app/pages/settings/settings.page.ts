import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(private router: Router, private alertController: AlertController, private sql: SqlService) { }

  aPropos(): void {
    this.router.navigate(['a-propos']);
  }

  async reset(): Promise<void>  {
    const alert = this.alertController.create({
      message: 'Voulez vous supprimer les données de l\'application ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.sql.reset();
          }
        },
        {
          text: 'Non'
        }
      ]
    });
    (await alert).present();
  }

}
