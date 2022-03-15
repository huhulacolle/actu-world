import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { BlagueService } from 'src/app/services/blague.service';


@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.page.html',
  styleUrls: ['./a-propos.page.scss'],
})
export class AProposPage implements OnInit {

  nom: string;
  version: string;
  androidVersion = this.device.version;
  constructeur = this.device.manufacturer;
  model = this.device.model;
  serial = this.device.serial;
  tap = 0;
  egg = null;

  constructor(private appVersion: AppVersion, private device: Device, private clipboard: Clipboard, private blague: BlagueService) { }

  ngOnInit() {
    this.getAppName();
    this.getVersionNumber();
  }

  getAppName(): void {
    this.appVersion.getAppName().then(
      data => {
        this.nom = data;
      }
    );
  }

  getVersionNumber(): void {
    this.appVersion.getVersionNumber().then(
      data => {
        this.version = data;
      }
    );
  }

  easterEgg(): void {
    this.tap++;
    if (this.tap >= 5) {
      this.blague.getBlagueLimite().subscribe(
        data => {
          this.egg = data;
        }
      )
    }
  }

}
