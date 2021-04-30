import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyAdminTab3PageRoutingModule } from './society-admin-tab3-routing.module';

import { SocietyAdminTab3Page } from './society-admin-tab3page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyAdminTab3PageRoutingModule
  ],
  declarations: [SocietyAdminTab3Page]
})
export class SocietyAdminTab3PageModule {}
