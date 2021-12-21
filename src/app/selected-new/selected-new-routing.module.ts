import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedNewPage } from './selected-new.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedNewPageRoutingModule {}
