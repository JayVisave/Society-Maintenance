import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyAdminTab1PageRoutingModule } from './society-admin-tab1-routing.module';

import { SocietyAdminTab1Page } from './society-admin-tab1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyAdminTab1PageRoutingModule
  ],
  declarations: [SocietyAdminTab1Page]
})
export class SocietyAdminTab1PageModule {}
