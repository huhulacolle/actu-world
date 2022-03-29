import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { INews } from 'src/app/interfaces/inews';
import { NewsService } from 'src/app/services/news.service';
import { SelectedNewPage } from '../selected-new/selected-new.page';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  // les news 
  articles: INews[];
  // boolean pour afficher (false) ou non (true) l'icône de chargement 
  content = false;

  constructor(
    private news: NewsService,
    private router: Router,
    private modalController: ModalController,
    ) { }

  ngOnInit() {
    this.getNews();
  }

  // pour accéder à la page selected-news selon l'article sélectionner 
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

  // pour acceder à la page search
  search(): void {
    this.router.navigate(['search']);
  }

  // récupère les derniers news et les inclus dans la variable articles 
  getNews(): void {
    this.news.getNews().subscribe(
      data => {
        this.articles = data.articles;
        this.content = true;
      });
  }
}
