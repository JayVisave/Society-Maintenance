import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNoticesPageRoutingModule } from './admin-notices-routing.module';

import { AdminNoticesPage } from './admin-notices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNoticesPageRoutingModule
  ],
  declarations: [AdminNoticesPage]
})
export class AdminNoticesPageModule {
  
}
