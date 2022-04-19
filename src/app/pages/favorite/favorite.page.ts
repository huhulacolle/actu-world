import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectedNewPage } from '../selected-new/selected-new.page';
import { SqlService } from 'src/app/services/sql.service';
import { INews } from 'src/app/interfaces/inews';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  favoris: INews[];
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

  // lance la page selectedNews selon l'article sélectionné par l'utilisateur dans l'interface utilisateur
  async selectedNews(url: string, urlToImage: string, source: string, title: string, description: string, content: string): Promise<void> {
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

  // récupère les derniers news mis en favoris et les inclus dans la variable favoris
  getFav(): void {
    this.sql.getFav().then((data) => {
      this.favoris = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          this.favoris.push(data.rows.item(i));
        }
        this.content = true;
      }
      // affiche un message d'erreur si aucuns favoris n'a été trouvé
      else {
        this.error = true;
      }
    });
  }

}
