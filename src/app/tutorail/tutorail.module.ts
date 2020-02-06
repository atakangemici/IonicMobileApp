import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorailPageRoutingModule } from './tutorail-routing.module';

import { TutorailPage } from './tutorail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorailPageRoutingModule
  ],
  declarations: [TutorailPage]
})
export class TutorailPageModule {}
