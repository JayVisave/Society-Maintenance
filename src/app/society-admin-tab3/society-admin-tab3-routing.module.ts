import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyAdminTab3Page } from './society-admin-tab3page';

const routes: Routes = [
  {
    path: '',
    component: SocietyAdminTab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyAdminTab3PageRoutingModule {}
