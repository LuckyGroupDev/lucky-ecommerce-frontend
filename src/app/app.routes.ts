import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/guards/auth.guard';
import { authRoutes } from './auth/features/auth.routes';

export const routes: Routes = [
  // rutas públicas
  {
    path: 'auth',
    canActivate: [publicGuard],
    // loadChildren: () => import('./auth/features/auth.routes'),
    loadChildren: () => import('./auth/features/auth.routes').then((m) => m.authRoutes),
  },
  // rutas privadas
  {
    path: '',
    canActivate: [privateGuard],
    // loadComponent: () => import('./shared/ui/layout/layout.component'),
    loadComponent: () => import('./shared/ui/layout/layout.component').then(m => m.LayoutComponent),

    children: [
      {
        path: 'dashboard',
        // loadComponent: () => import('./dashboard/dashboard.component'),
        loadComponent: () =>
          import('./dashboards/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
         loadChildren: () => 
          import('./products/features/product.routes').then(m => m.productsRoutes),

      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: '**',
    // redirectTo: '',
    redirectTo: 'auth/login',  // Redirige cualquier ruta no válida a login

    // redirectTo: 'auth/login',
  },
];
