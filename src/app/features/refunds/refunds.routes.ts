import { Routes } from '@angular/router';

export const refundsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/refunds/refunds').then((m) => m.Refunds),
  },
];
