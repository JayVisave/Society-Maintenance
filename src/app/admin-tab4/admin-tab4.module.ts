import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTab4PageRoutingModule } from './admin-tab4-routing.module';

import { AdminTab4Page } from './admin-tab4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTab4PageRoutingModule
  ],
  declarations: [AdminTab4Page]
})
export class AdminTab4PageModule {}
