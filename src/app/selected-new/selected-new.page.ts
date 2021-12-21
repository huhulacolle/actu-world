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

  constructor(
    private sql: SqlService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
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
