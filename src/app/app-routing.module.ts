import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',  redirectTo: 'welcome', pathMatch: "full",
   
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
  ,
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'admin-tab1',
    loadChildren: () => import('./admin-tab1/admin-tab1.module').then( m => m.AdminTab1PageModule)
  },
  {
    path: 'admin-tab2',
    loadChildren: () => import('./admin-tab2/admin-tab2.module').then( m => m.AdminTab2PageModule)
  },
  {
    path: 'admin-tab3',
    loadChildren: () => import('./admin-tab3/admin-tab3.module').then( m => m.AdminTab3PageModule)
  },
  {
    path: 'admin-tab4',
    loadChildren: () => import('./admin-tab4/admin-tab4.module').then( m => m.AdminTab4PageModule)
  },
  {
    path: 'society-admin-tab1',
    loadChildren: () => import('./society-admin-tab1/society-admin-tab1.module').then( m => m.SocietyAdminTab1PageModule)
  },
  {
    path: 'society-admin-tab2',
    loadChildren: () => import('./society-admin-tab2/society-admin-tab2.module').then( m => m.SocietyAdminTab2PageModule)
  },
  {
    path: 'society-admin-tab3',
    loadChildren: () => import('./society-admin-tab3/society-admin-tab3.module').then( m => m.SocietyAdminTab3PageModule)
  },
  {
    path: 'all-notices',
    loadChildren: () => import('./all-notices/all-notices.module').then( m => m.AllNoticesPageModule)
  },
  {
    path: 'admin-notices',
    loadChildren: () => import('./admin-notices/admin-notices.module').then( m => m.AdminNoticesPageModule)
  },
  {
    path: 'tab-visitor',
    loadChildren: () => import('./tab-visitor/tab-visitor.module').then( m => m.TabVisitorPageModule)
  },
  {
    path: 'society-all-visitors',
    loadChildren: () => import('./society-all-visitors/society-all-visitors.module').then( m => m.SocietyAllVisitorsPageModule)
  },
  // {
  //   path: 'chat',
  //   loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  // },
  {
    path: 'chat/:nickname',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'home-discussion',
    loadChildren: () => import('./home-discussion/home-discussion.module').then( m => m.HomeDiscussionPageModule)
  }




  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
