import { Routes } from '@angular/router';

export const systemConfigurationsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'general-configurations',
    pathMatch: 'full',
  },
  {
    path: 'general-configurations',
    loadComponent: () =>
      import('./pages/general-configurations/general-configurations').then(
        (m) => m.GeneralConfigurations,
      ),
  },
  {
    path: 'cities',
    loadComponent: () => import('./pages/cities/cities').then((m) => m.Cities),
  },
  {
    path: 'sports',
    loadComponent: () => import('./pages/sports/sports').then((m) => m.Sports),
  },
];
