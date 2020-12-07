import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyAdminTab2Page } from './society-admin-tab2.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyAdminTab2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyAdminTab2PageRoutingModule {}
