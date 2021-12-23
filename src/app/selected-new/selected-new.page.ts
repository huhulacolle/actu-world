import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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

  icon: string;

  constructor(
    private sql: SqlService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.isFav();
  }

  isFav(): void {
    const isFav = [];
    this.sql.isFav(this.title).then((data) => {
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          isFav.push(data.rows.item(i));
        }
      }
    });
    if (JSON.stringify(isFav) === '[]') {
      this.icon = 'star-outline';
    }
    else {
      this.icon = 'star';
    }
  }

  favoris(): void {
    this.sql.setFav(this.url, this.urlToImage, this.source, this.title, this.description, this.content);
    this.message();
  }

  async message() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 3000,
    });
    toast.present();
  }

  back() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
