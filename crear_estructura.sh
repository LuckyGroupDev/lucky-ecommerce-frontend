#!/bin/bash

# Crear carpetas
mkdir -p src/app/{auth/{data-access,features/{login,sign-up}},core/{data-access,guards,interceptors},dashboards,products/{data-access,features/{product-detail,product-list},ui/product-card,utils},shared/{data-access,ui/{button,layout},models}} public/assets/{images,styles}

# Crear archivos base
touch \
  src/main.ts \
  src/index.html \
  public/assets/styles/styles.css \
  src/app/app.config.ts \
  src/app/app.component.ts \
  src/app/app.component.html \
  src/app/app.routes.ts \
  src/app/auth/data-access/auth.service.ts \
  src/app/auth/features/login/login.component.ts \
  src/app/auth/features/login/login.component.html \
  src/app/auth/features/sign-up/sign-up.component.ts \
  src/app/auth/features/sign-up/sign-up.component.html \
  src/app/auth/features/auth.routes.ts \
  src/app/core/data-access/auth-state.service.ts \
  src/app/core/guards/auth.guard.ts \
  src/app/core/interceptors/auth.interceptor.ts \
  src/app/dashboards/dashboard.component.ts \
  src/app/dashboards/dashboard.component.html \
  src/app/products/data-access/product-store.service.ts \
  src/app/products/data-access/product.service.ts \
  src/app/products/features/product-detail/product-detail.component.ts \
  src/app/products/features/product-detail/product-detail.component.html \
  src/app/products/features/product-list/product-list.component.ts \
  src/app/products/features/product-list/product-list.component.html \
  src/app/products/ui/product-card/product-card.component.ts \
  src/app/products/features/product.routes.ts \
  src/app/shared/data-access/http.service.ts \
  src/app/shared/data-access/storage.service.ts \
  src/app/shared/ui/button/button.component.ts \
  src/app/shared/ui/button/button.component.html \
  src/app/shared/ui/layout/footer.component.ts \
  src/app/shared/ui/layout/footer.component.html \
  src/app/shared/ui/layout/layout.component.ts \
  src/app/shared/ui/layout/layout.component.html \
  src/app/shared/ui/layout/navbar.component.ts \
  src/app/shared/ui/layout/navbar.component.html \
  src/app/shared/models/user.interface.ts \
  src/app/shared/models/product.interface.ts \
  src/app/shared/models/api-response.interface.ts
