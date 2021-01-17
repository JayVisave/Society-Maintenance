import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'all-notices',
        loadChildren: () => import('../all-notices/all-notices.module').then(m => m.AllNoticesPageModule)
      },
      {
        path: 'admin-tab1',
        loadChildren: () => import('../admin-tab1/admin-tab1.module').then(m => m.AdminTab1PageModule)
      },
      {
        path: 'admin-tab2',
        loadChildren: () => import('../admin-tab2/admin-tab2.module').then(m => m.AdminTab2PageModule)
      },
      {
        path: 'admin-tab3',
        loadChildren: () => import('../admin-tab3/admin-tab3.module').then(m => m.AdminTab3PageModule)
      },
      {
        path: 'admin-tab4',
        loadChildren: () => import('../admin-tab4/admin-tab4.module').then(m => m.AdminTab4PageModule)
      },
      {
        path: 'admin-notices',
        loadChildren: () => import('../admin-notices/admin-notices.module').then(m => m.AdminNoticesPageModule)
      },
      {
        path: 'society-admin-tab1',
        loadChildren: () => import('../society-admin-tab1/society-admin-tab1.module').then(m => m.SocietyAdminTab1PageModule)
      },
      {
        path: 'society-admin-tab2',
        loadChildren: () => import('../society-admin-tab2/society-admin-tab2.module').then(m => m.SocietyAdminTab2PageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
