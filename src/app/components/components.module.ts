import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SlidesComponent],
  exports:[SlidesComponent],
  imports: [CommonModule
  ]
})
export class ComponentsModule { }
