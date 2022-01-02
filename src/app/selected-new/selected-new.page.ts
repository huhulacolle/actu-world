import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-selected-new',
  templateUrl: './selected-new.page.html',
  styleUrls: ['./selected-new.page.scss'],
})
export class SelectedNewPage implements OnInit {

  url: string;
  urlToImage: string;
  source: string;
  title: string;
  description: string;
  content: string;
  alert: HTMLIonAlertElement;
  icon: string;

  constructor(
    private sql: SqlService,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  isFav(): void {
    this.sql.isFav(this.title).then((data) => {
      if (data.rows.length > 0) {
        this.deleteFav();
      }
      else {
        this.favoris();
      }
    });

  }

  favoris(): void {
    this.sql.setFav(this.url, this.urlToImage, this.source, this.title, this.description, this.content);
    this.message();
  }

  deleteFav(): void {
    this.sql.deleteFav(this.title);
    this.delmessage();
  }

  async presentAlert(): Promise<void> {

    this.sql.isFav(this.title).then(async (data) => {
      if (data.rows.length > 0) {
            this.alert = await this.alertController.create({
          message: 'Voulez vous ajoutez supprimer le favoris ?',
          buttons: [
            {
              text: 'Oui',
              handler: () => {
                this.deleteFav();
              }
            },
            {
              text: 'Non'
            }
          ]
        });
      }
      else {
          this.alert = await this.alertController.create({
          message: 'Voulez vous ajoutez l\'article en favoris ?',
          buttons: [
            {
              text: 'Oui',
              handler: () => {
                this.favoris();
              }
            },
            {
              text: 'Non'
            }
          ]
        });
      }
      await this.alert.present();
    });
  }

  async message(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Favoris ajoutés.',
      duration: 3000,
    });
    toast.present();
  }

  async delmessage(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Favoris supprimés.',
      duration: 3000,
    });
    toast.present();
  }

  back(): void {
    this.modalController.dismiss(true);
  }
}
