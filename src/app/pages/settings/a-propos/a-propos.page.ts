import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { BlagueService } from 'src/app/services/blague.service';
import { IBlague } from 'src/app/interfaces/iblague';
import { EmailComposer, OpenOptions } from 'capacitor-email-composer';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.page.html',
  styleUrls: ['./a-propos.page.scss'],
})
export class AProposPage implements OnInit {

  nom: string;
  version: 1.1;
  androidVersion = this.device.version;
  constructeur = this.device.manufacturer;
  model = this.device.model;
  tap = 0;
  blague: IBlague;

  constructor(
    private appVersion: AppVersion,
    private device: Device,
    private blagueService: BlagueService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getAppName();
  }

  getAppName(): void {
    this.appVersion.getAppName().then(
      data => {
        this.nom = data;
      }
    );
  }

  // easter egg
  secret(): void {
    this.tap++;
    if (this.tap >= 5) {
      this.blagueService.getBlagueLimite().subscribe(
        data => {
          this.blague = data;
        }
      )
    }
  }

  async problem(): Promise<void> {
    const alert = await this.alertController.create({
      message: 'qu\'elle est votre problème ?',
      inputs: [
        {
          name: 'problem',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Envoyer',
          handler: (data) => {
            this.openEmail(data.problem)
          }
        }
      ]
    });
    await alert.present();
  }

  // ouvre l'application mail de l'utilisateur
  async openEmail(problem: string): Promise<void> {
    if (!(problem == null || problem === "")) {
      const body = problem + " \n \n " +
      "Version :" + this.version + " \n" +
      "Version d'Android : " + this.androidVersion + " \n" +
      "Constructeur : " + this.constructeur + " \n" +
      "Modèle : " + this.model + " \n";
      const email: OpenOptions = {
        to: ["QuestionActuWorld@yopmail.com"],
        subject: 'Phone Hardware for Debug - Actu World',
        body: body
      };

      if (await EmailComposer.hasAccount()) {
        EmailComposer.open(email);
      } else {
        alert("Erreur : Application mail manquante")
      }
    }
    else {
      const alert = await this.alertController.create({
        message: 'Le champ problème est vide',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      await alert.present();

    }
  }

}
