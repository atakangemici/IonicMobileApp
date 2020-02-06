import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'productDetail/:id',
    loadChildren: () => import('./productDetail/productDetail.module').then(m => m.productDetailModule)
  },
  {
    path: 'tutorail',
    loadChildren: () => import('./tutorail/tutorail.module').then(m => m.TutorailPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/tab1.module').then(m => m.Tab1PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
