import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'event-detail/:id',
    loadComponent: () => import('./pages/event-detail/event-detail.page').then( m => m.EventDetailPage)
  },
];
