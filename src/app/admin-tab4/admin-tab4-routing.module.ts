import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTab4Page } from './admin-tab4.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTab4PageRoutingModule {}
