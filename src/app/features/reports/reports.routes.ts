import { Routes } from '@angular/router';

export const reportsRoutes: Routes = [
  {
    path: 'subscription-revenue',
    loadComponent: () =>
      import('./pages/subscription-revenue/subscription-revenue').then(
        (m) => m.SubscriptionRevenue,
      ),
  },
  {
    path: 'booking-revenue',
    loadComponent: () =>
      import('./pages/booking-revenue/booking-revenue').then((m) => m.BookingRevenue),
  },
  {
    path: 'sports-revenue',
    loadComponent: () =>
      import('./pages/sports-revenue/sports-revenue').then((m) => m.SportsRevenue),
  },
  {
    path: 'organization-revenue',
    loadComponent: () =>
      import('./pages/organization-revenue/organization-revenue').then(
        (m) => m.OrganizationRevenue,
      ),
  },
];
