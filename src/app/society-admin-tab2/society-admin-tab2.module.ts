import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyAdminTab2PageRoutingModule } from './society-admin-tab2-routing.module';

import { SocietyAdminTab2Page } from './society-admin-tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyAdminTab2PageRoutingModule
  ],
  declarations: [SocietyAdminTab2Page]
})
export class SocietyAdminTab2PageModule {}
