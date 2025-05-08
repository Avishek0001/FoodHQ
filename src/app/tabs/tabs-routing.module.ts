import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [authGuard]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [authGuard]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [authGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account-routing.module').then(m => m.AccountPageRoutingModule),
        canActivate: [authGuard]
      },
      {
        path:'address',
        loadChildren: () => import('../address/address.module').then(m=> m.AddressPageModule),
        canActivate: [authGuard]
      },
      {
        path:'edit-address',
        loadChildren:()=> import('../address/edit-address/edit-address.module').then(m=>m.EditAddressPageModule),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
        
      }
    ]
  },
  {
    path:'restaurants/:restaurantId',
    loadChildren: () => import('../items/items-routing.module').then(m=> m.ItemsPageRoutingModule),
    canActivate: [authGuard]
  },
  {
    path:'payment',
    loadChildren: () => import('../payment/payment-routing.module').then(m=>m.PaymentPageRoutingModule),
    canActivate: [authGuard]

  },
  
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
