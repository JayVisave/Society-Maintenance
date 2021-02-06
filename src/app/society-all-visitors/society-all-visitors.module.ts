import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyAllVisitorsPageRoutingModule } from './society-all-visitors-routing.module';

import { SocietyAllVisitorsPage } from './society-all-visitors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyAllVisitorsPageRoutingModule
  ],
  declarations: [SocietyAllVisitorsPage]
})
export class SocietyAllVisitorsPageModule {}
