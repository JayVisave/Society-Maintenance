import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyAllVisitorsPage } from './society-all-visitors.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyAllVisitorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyAllVisitorsPageRoutingModule {}
