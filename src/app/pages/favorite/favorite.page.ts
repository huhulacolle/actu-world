import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectedNewPage } from '../selected-new/selected-new.page';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  favoris: any;
  content = false;
  error = false;

  constructor(
    private sql: SqlService,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.loading();
  }

  loading(): void {
    setTimeout(() => {
      this.getFav();
    }, 1000);
  }

  async selectedNews(url: string, urlToImage: string, source: string, title: string, description: string, content: string) {
    const modal = await this.modalController.create({
      component: SelectedNewPage,
      componentProps: {
        url,
        urlToImage,
        source,
        title,
        description,
        content
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        if (dataReturned) {
          this.favoris = null;
          this.getFav();
        }
      }
    });

    return await modal.present();
  }

  getFav(): void {
    this.sql.getFav().then((data) => {
      this.favoris = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.favoris.push(data.rows.item(i));
        }
        this.content = true;
      }
      else {
        // alert('rien');
        this.error = true;
      }
    });
  }

}