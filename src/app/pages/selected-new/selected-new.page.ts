import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { SqlService } from 'src/app/services/sql.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

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
  data: string;
  alert: HTMLIonAlertElement;
  icon: string;
  qrcode = false;
  segment: number;

  constructor(
    private sql: SqlService,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private clipboard: Clipboard,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit(): void {
    if (this.content.lastIndexOf('[') > -1) {
      this.content = this.content.substring(0, this.content.lastIndexOf('['));
    }
  }

  copy(): void {
    this.clipboard.copy(this.url);
    this.message('copy');
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
    if (!this.source) {
      this.source = 'QRCode';
    }
    this.sql.setFav(this.url, this.urlToImage, this.source, this.title, this.description, this.content);
    this.message('add');
  }

  deleteFav(): void {
    this.sql.deleteFav(this.title);
    this.message('delete');
  }

  async presentAlert(): Promise<void> {

    this.sql.isFav(this.title).then(async (data) => {
      if (data.rows.length > 0) {
          this.alert = await this.alertController.create({
          message: 'Voulez vous supprimer le favoris ?',
          buttons: [
            {
              text: 'Non'
            },
            {
              text: 'Oui',
              handler: () => {
                this.deleteFav();
              }
            }
          ]
        });
      }
      else {
          this.alert = await this.alertController.create({
          message: 'Voulez vous ajoutez l\'article en favoris ?',
          buttons: [
            {
              text: 'Non'
            },
            {
              text: 'Oui',
              handler: () => {
                this.favoris();
              }
            }
          ]
        });
      }
      await this.alert.present();
    });
  }

  async message(msg: string): Promise<void> {
    let toast:  HTMLIonToastElement;

    switch (msg) {
      case 'add':
        toast = await this.toastController.create({
          message: 'Favoris ajoutés.',
          duration: 2000,
        });

        break;

      case 'delete':
        toast = await this.toastController.create({
          message: 'Favoris effacés',
          duration: 2000,
        });

        break;

      case 'copy':
        toast = await this.toastController.create({
          message: 'URL de l\'article copié dans le presse-papier',
          duration: 2000,
        });

        break;
    }
    toast.present();
  }

  setQRCode(): void {
    if (this.qrcode) {
      this.qrcode = false;
    }
    else  {
      const data = {
        url: this.url,
        urlToImage: this.urlToImage,
        source: this.source,
        title: this.title,
        description: this.description,
        content: this.content
      };
      this.data = JSON.stringify(data);
      this.qrcode = true;
      this.segment = 0;
    }
  }

  share(): void {
    this.socialSharing.share(this.url);
  }

  back(): void {
    this.modalController.dismiss(true);
  }
}
