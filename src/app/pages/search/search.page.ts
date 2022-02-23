import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { ModalController, NavController, PickerController, PickerOptions } from '@ionic/angular';
import { SelectedNewPage } from '../selected-new/selected-new.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  articles: any;
  content = false;
  sources: any[] = [];
  animals: string[] = ['Tiger', 'Lion', 'Elephant', 'Fox', 'Wolf'];
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

    getColumnSources(): any[] {
      const options: any[] = [];
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

    getColumnDates(){
      const options = [];
      this.animals.forEach(x => {
        options.push({text:x,value:x});
      });
      return options;
    }

    async columnDate(): Promise<void> {
      const options: PickerOptions = {
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text:'Ok',
            handler:(value: any) => {
              console.log(value);
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
