// src/app/auth/data-access/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { HttpService } from '../../shared/data-access/http.service';
import { User } from '../../shared/models/user.interface';
import { AuthStateService } from '../../core/data-access/auth-state.service';
import { throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'https://localhost:7194/api/Users/Authenticate';
  private apiUrl = `${environment.apiBaseUrl}/Users/Authenticate`;  // ahora modular

  constructor(
    private http: HttpService,
    private router: Router,
    private authState: AuthStateService
  ) {}

  // Método para el login
  login(credentials: { userName: string; password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          this.authState.setUser(response);
        } else {
          throw new Error('Token inválido en la respuesta');
        }
      }),
      catchError((error) => {
         return throwError(() => new Error('Error en autenticación'));
      })
    );
  }
  

  logout(): void {
    this.authState.logout();
  }

  getToken(): string | null {
    return this.authState.getToken();
  }

  isLoggedIn(): boolean {
    return this.authState.isAuthenticated();
  }
}
