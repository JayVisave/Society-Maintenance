import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabVisitorPageRoutingModule } from './tab-visitor-routing.module';

import { TabVisitorPage } from './tab-visitor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabVisitorPageRoutingModule
  ],
  declarations: [TabVisitorPage]
})
export class TabVisitorPageModule {}
