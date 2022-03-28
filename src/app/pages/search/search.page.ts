import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ModalController, NavController, PickerController, PickerOptions } from '@ionic/angular';
import { SelectedNewPage } from '../selected-new/selected-new.page';
import { INews } from 'src/app/interfaces/inews';
import { ISource } from 'src/app/interfaces/isource';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  articles: any;
  content = false;
  sources: ISource[] = [];
  column = {
    title: 'Article',
    value: null
  };
  constructor(
    private news: NewsService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private pickerController: PickerController,
    ) { }

  ngOnInit() {
    this.getSources();
  }

    getSources(): void {
      this.news.getSources().then(
        data => {
          data.sources.forEach(x => {
            this.sources.push(x);
          });
        }
      );
    }

    getColumnSources(): Object[] {
      const options: Object[] = [];
      options.push(
        {
          text: 'Tous',
          value: null
        }
      );
      this.sources.forEach(x => {
        options.push(
          {
            text: x.name,
            value: x.id
          }
        );
      });
      return options;
    }

    async columnSources(): Promise<void> {
      const options: PickerOptions = {
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text:'Ok',
            handler:(value: any) => {
              if (value.date.text === 'Tous') {
                this.column.title = 'Article';
                this.column.value = null;
              }
              else {
                this.column.title = value.date.text;
                this.column.value = value.date.value;
              }
            }
          }
        ],
        columns:[{
          name:'date',
          options:this.getColumnSources()
        }]
      };

      const picker = await this.pickerController.create(options);
      picker.present();
    }

  getSearch(q: string, source: string): void {
    this.news.getSearch(q, source).subscribe(
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
