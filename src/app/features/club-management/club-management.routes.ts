import { Routes } from '@angular/router';

export const clubManagementRoutes: Routes = [
  {
    path: 'organizations',
    loadComponent: () => import('./pages/organizations/organizations').then((m) => m.Organizations),
  },
  {
    path: 'managers',
    loadComponent: () => import('./pages/managers/managers').then((m) => m.Managers),
  },
  {
    path: 'facilities',
    loadComponent: () => import('./pages/facilities/facilities').then((m) => m.Facilities),
  },
];
