import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../data-access/auth-state.service';

// 🔒 GUARD PARA RUTAS PRIVADAS (solo si estás autenticado)
export const privateGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService); // Inyecta tu servicio centralizado de auth state
  const router = inject(Router);              // Inyecta el Router para redirigir si no está logueado

  // ✅ Las signals "computed" se leen como propiedades: sin paréntesis ()
  const isAuth = authState.isAuthenticated(); // 👈 Esto devuelve true/false (correcto)

 
  // ✅ Si está autenticado, permite pasar a la ruta (true), si no, redirige al login
  return isAuth
    ? true
    : router.createUrlTree(['/auth/login']);
};

// 🌐 GUARD PARA RUTAS PÚBLICAS (solo si NO estás autenticado)
export const publicGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService); // Inyecta AuthStateService
  const router = inject(Router);              // Inyecta Router para redirigir si ya está logueado

  const isAuth = authState.isAuthenticated(); // 👈 Lee si está logueado

 
  // ✅ Si NO está autenticado, permite entrar (true); si está logueado, redirige al dashboard
  return !isAuth
    ? true
    : router.createUrlTree(['/dashboard']);
};
