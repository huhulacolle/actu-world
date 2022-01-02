import { Component } from '@angular/core';
import { NewsService } from '../news.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  articles: any;
  content = false;
  constructor(private news: NewsService, private navCtrl: NavController) { }

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


}
