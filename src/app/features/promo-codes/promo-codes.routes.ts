import { Routes } from '@angular/router';

export const promoCodesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/promo-codes/promo-codes').then((m) => m.PromoCodes),
  },
];
