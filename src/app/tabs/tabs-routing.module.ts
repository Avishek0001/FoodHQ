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
        path: 'account',
        loadChildren: () => import('../account/account-routing.module').then(m => m.AccountPageRoutingModule)
      },
      {
        path:'address',
        loadChildren: () => import('../address/address.module').then(m=> m.AddressPageModule)
      },
      {
        path:'edit-address',
        loadChildren:()=> import('../address/edit-address/edit-address.module').then(m=>m.EditAddressPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'restaurants/:restaurantId',
    loadChildren: () => import('../items/items-routing.module').then(m=> m.ItemsPageRoutingModule)
  },
  {
    path:'payment',
    loadChildren: () => import('../payment/payment-routing.module').then(m=>m.PaymentPageRoutingModule)

  },
  
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
