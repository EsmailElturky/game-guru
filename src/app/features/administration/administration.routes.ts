import { Routes } from '@angular/router';

export const administrationRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users').then((m) => m.Users),
  },
  {
    path: 'roles',
    loadComponent: () => import('./pages/roles/roles').then((m) => m.Roles),
  },
  {
    path: 'audits',
    loadComponent: () => import('./pages/audits/audits').then((m) => m.Audits),
  },
];
