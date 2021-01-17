import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllNoticesPage } from './all-notices.page';

const routes: Routes = [
  {
    path: '',
    component: AllNoticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllNoticesPageRoutingModule {}
