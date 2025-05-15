import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthStateService } from '../../core/data-access/auth-state.service'; // Importa AuthStateService

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthStateService); // Inyecta tu AuthStateService
  const token = authState.getToken(); // Obtiene el token centralizado

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
