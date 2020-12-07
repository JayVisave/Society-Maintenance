import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyAdminTab1Page } from './society-admin-tab1.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyAdminTab1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyAdminTab1PageRoutingModule {}
