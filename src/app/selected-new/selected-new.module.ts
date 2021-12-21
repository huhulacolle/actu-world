import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedNewPageRoutingModule } from './selected-new-routing.module';

import { SelectedNewPage } from './selected-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedNewPageRoutingModule
  ],
  declarations: [SelectedNewPage]
})
export class SelectedNewPageModule {}
