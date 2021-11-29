import { Component, OnInit } from '@angular/core';
import { SqlService } from '../sql.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  constructor(private sql: SqlService) { }

  testsql(): void {
    // this.sql.create();
  }

  ngOnInit() {
  }

}
