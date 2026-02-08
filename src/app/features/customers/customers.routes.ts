import { Routes } from '@angular/router';

export const customersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/customers/customers').then((m) => m.Customers),
  },
];
