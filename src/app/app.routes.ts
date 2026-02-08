import { Routes } from '@angular/router';
import { dashboardRoutes } from './features/dashboard/dashboard.routes';
import { systemConfigurationsRoutes } from './features/system-configurations/system-configurations.routes';
import { administrationRoutes } from './features/administration/administration.routes';
import { clubManagementRoutes } from './features/club-management/club-management.routes';
import { bookingRoutes } from './features/booking/booking.routes';
import { promoCodesRoutes } from './features/promo-codes/promo-codes.routes';
import { customersRoutes } from './features/customers/customers.routes';
import { refundsRoutes } from './features/refunds/refunds.routes';
import { reportsRoutes } from './features/reports/reports.routes';
import { profileRoutes } from './features/profile/profile.routes';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: '',
    loadComponent: () => import('./core/components/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        children: dashboardRoutes,
      },
      {
        path: 'system-configurations',
        children: systemConfigurationsRoutes,
      },
      {
        path: 'administration',
        children: administrationRoutes,
      },
      {
        path: 'club-management',
        children: clubManagementRoutes,
      },
      {
        path: 'booking',
        children: bookingRoutes,
      },
      {
        path: 'promo-codes',
        children: promoCodesRoutes,
      },
      {
        path: 'customers',
        children: customersRoutes,
      },
      {
        path: 'refunds',
        children: refundsRoutes,
      },
      {
        path: 'reports',
        children: reportsRoutes,
      },
      {
        path: 'profile',
        children: profileRoutes,
      },
    ],
  },
];
