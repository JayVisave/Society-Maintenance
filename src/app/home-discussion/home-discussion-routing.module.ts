import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDiscussionPage } from './home-discussion.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDiscussionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDiscussionPageRoutingModule {}
