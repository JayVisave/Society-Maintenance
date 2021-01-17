import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNoticesPage } from './admin-notices.page';

const routes: Routes = [
  {
    path: '',
    component: AdminNoticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNoticesPageRoutingModule {}
