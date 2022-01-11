import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { Article } from '../article';
import { SelectedNewPage } from '../selected-new/selected-new.page';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  scanActive = false;
  data: Article;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.startScanner();
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

  async checkPermission(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner(): Promise<void> {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        this.data = JSON.parse(result.content);
        this.selectedNews(this.data.url, this.data.urlToImage, this.data.source.name,
          this.data.title, this.data.description, this.data.content);

      } else {
        alert('NO DATA FOUND!');
      }

    } else {
      alert('Erreur : autorisations de l\'appareil photo non accordé');
    }
  }

  stopScanner(): void {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave(): void {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
