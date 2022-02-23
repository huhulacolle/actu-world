import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { NewsService } from '../news.service';
import { SelectedNewPage } from '../selected-new/selected-new.page';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  articles: any[];
  content = false;

  constructor(
    private news: NewsService,
    private router: Router,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.getNews();
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

  refresh(event): void {
    setTimeout(() => {
      this.getNews();
      event.target.complete();
    }, 2000);
  }

  search(): void {
    this.router.navigate(['search']);
  }

  getNews(): void {
    this.news.getNews().subscribe(
      data => {
        this.articles = data.articles;
        this.content = true;
      });
  }
}
