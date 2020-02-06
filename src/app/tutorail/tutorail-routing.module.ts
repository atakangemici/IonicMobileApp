import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorailPage } from './tutorail.page';

const routes: Routes = [
  {
    path: '',
    component: TutorailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorailPageRoutingModule {}
