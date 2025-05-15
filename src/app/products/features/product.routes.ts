// src/app/products/features/product.routes.ts

import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductListComponent, // Ruta principal para la lista de productos
  },
  {
    path: ':id',
    component: ProductDetailComponent, // Ruta para el detalle de un producto específico
  },
];
