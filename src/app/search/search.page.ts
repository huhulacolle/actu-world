import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { ModalController, NavController } from '@ionic/angular';
import { SelectedNewPage } from '../selected-new/selected-new.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  articles: any;
  content = false;
  constructor(
    private news: NewsService,
    private navCtrl: NavController,
    private modalController: ModalController,
    ) { }

  getSearch(q: string): void {
    this.news.getSearch(q).subscribe(
      data => {
        this.articles = data.articles;
      }
    );
    this.content = true;
  }

  back(): void {
    this.navCtrl.back();
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
    return await modal.present();
  }


}
