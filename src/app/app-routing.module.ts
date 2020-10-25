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
  },  {
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
  }


  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
