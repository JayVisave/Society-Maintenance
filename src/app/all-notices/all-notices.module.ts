import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllNoticesPageRoutingModule } from './all-notices-routing.module';

import { AllNoticesPage } from './all-notices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllNoticesPageRoutingModule
  ],
  declarations: [AllNoticesPage]
})
export class AllNoticesPageModule {}
