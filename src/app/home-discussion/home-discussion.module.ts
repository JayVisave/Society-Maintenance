import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDiscussionPageRoutingModule } from './home-discussion-routing.module';

import { HomeDiscussionPage } from './home-discussion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDiscussionPageRoutingModule
  ],
  declarations: [HomeDiscussionPage]
})
export class HomeDiscussionPageModule {}
