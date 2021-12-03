import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-profils',
  templateUrl: './profils.page.html',
  styleUrls: ['./profils.page.scss'],
})
export class ProfilsPage implements OnInit {

  constructor(private sql: SqlService,  private loadingController: LoadingController) { }

  ngOnInit() {
  }

}


