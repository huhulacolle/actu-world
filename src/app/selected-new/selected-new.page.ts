import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SqlService } from '../sql.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-selected-new',
  templateUrl: './selected-new.page.html',
  styleUrls: ['./selected-new.page.scss'],
})
export class SelectedNewPage {

  url: string;
  urlToImage: string;
  source: string;
  title: string;
  description: string;
  content: string;
  alert: HTMLIonAlertElement;
  icon: string;
  qrcode = false;

  constructor(
    private sql: SqlService,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private clipboard: Clipboard,
  ) { }

  copy(): void {
    this.clipboard.copy(this.url);
    this.copyMessage();
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
          message: 'Voulez vous supprimer le favoris ?',
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
      duration: 2000,
    });
    toast.present();
  }

  async delmessage(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Favoris supprimés.',
      duration: 2000,
    });
    toast.present();
  }

  async copyMessage(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'URL de l\'article copié dans le presse-papier',
      duration: 2000,
    });
    toast.present();
  }

  setQRCode(): void {
    if (this.qrcode) {
      this.qrcode = false;
    }
    else  {
      this.qrcode = true;
    }
  }

  back(): void {
    this.modalController.dismiss(true);
  }
}
