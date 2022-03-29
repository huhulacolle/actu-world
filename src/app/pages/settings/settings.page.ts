import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppPreferences } from '@awesome-cordova-plugins/app-preferences/ngx';
import { AlertController, PickerController, PickerOptions } from '@ionic/angular';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  lang: any;


  // selectLang = [
  //   { text: 'Français', value: 'fr' },
  //   { text: 'Anglais', value: 'en' },
  //   { text: 'Espagnol', value: 'es' },
  //   { text: 'Italien', value: 'it' },
  //   { text: 'Portugais', value: 'pt' },
  //   { text: 'Allemands', value: 'de' }
  // ]

  selectLang = [
    { text: 'Français', value: 'fr' },
    { text: 'Anglais', value: 'en' },
    { text: 'Espagnol', value: 'es' },
    { text: 'Italien', value: 'it' },
    { text: 'Portugais', value: 'pt' },
    { text: 'Allemands', value: 'de' }
  ]

  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private sql: SqlService,
    private appPref: AppPreferences,
    private pickerController: PickerController
    ) { }

  ngOnInit() {
    this.getLang();
  }

  getLang(): void {
    this.appPref.fetch('lang').then(
      lang => {
        this.lang = lang;
      }
    )
  }

  async changeLang(): Promise<void> {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Annuler",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            this.lang = value.lang.value;
            this.appPref.store('lang', this.lang);
            this.messageRestart();
          }
        }
      ],
      columns:[{
        name:'lang',
        options: this.selectLang
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present()
  }

  aPropos(): void {
    this.router.navigate(['a-propos']);
  }

  async resetAppPref(): Promise<void> {
    const alert = this.alertController.create({
      message: 'Voulez vous supprimer les préférences de langues ?',
      buttons: [
        {
          text: 'Non'
        },
        {
          text: 'Oui',
          handler: () => {
            this.appPref.remove('lang');
            this.messageRestart();
          }
        }
      ]
    });
    (await alert).present();
  }

  async resetFavoris(): Promise<void>  {
    const alert = this.alertController.create({
      message: 'Voulez vous supprimer les données de l\'application ?',
      buttons: [
        {
          text: 'Non'
        },
        {
          text: 'Oui',
          handler: () => {
            this.sql.resetFav();
          }
        }
      ]
    });
    (await alert).present();
  }

  async messageRestart(): Promise<void> {
    const alert = await this.alertController.create({
      message: 'La modification de ce paramètre require le redemarrage de l\'application ?',
      buttons: [
        {
          text: 'redemarrer maintenant',
          handler: () => {
            window.location.assign('/');
          }
        },
        {
          text: 'redemarrer plus tard'
        },
      ]
    });
    alert.present();
  }

}
