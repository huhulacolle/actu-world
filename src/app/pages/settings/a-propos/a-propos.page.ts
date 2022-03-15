import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { BlagueService } from 'src/app/services/blague.service';
import { IBlague } from 'src/app/interfaces/iblague';


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
  blague: IBlague;

  constructor(private appVersion: AppVersion, private device: Device, private clipboard: Clipboard, private blagueService: BlagueService) { }

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

}
