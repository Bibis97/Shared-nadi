import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    component: TabsPage,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'tickets',
        children: [
          {
            path: '',
            loadChildren: '../tickets-tab/tickets-tab.module#TicketsTabPageModule'
          }
        ]
      },
      {
        path: 'create-ticket',
        children: [
          {
            path: '',
            loadChildren: '../create-ticket-tab/create-ticket-tab.module#CreateTicketTabPageModule'
          }
        ]
      },
      {
        path: 'indetail',
        children: [
          {
            path: '',
            loadChildren: '../ticket-detailview-tab/ticket-detailview-tab.module#TicketDetailviewTabPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile-tab/profile-tab.module#ProfileTabPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings-tab/settings-tab.module#SettingsTabPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/tickets',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/tickets',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
