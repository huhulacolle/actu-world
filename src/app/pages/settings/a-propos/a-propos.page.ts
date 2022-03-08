import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.page.html',
  styleUrls: ['./a-propos.page.scss'],
})
export class AProposPage implements OnInit {

  nom: string;
  version: string;

  constructor(private appVersion: AppVersion) { }

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
}
