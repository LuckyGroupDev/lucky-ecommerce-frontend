import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly _user = signal<User | null>(null);

  // Computed
  readonly isAuthenticatedSignal = computed(() => this._user() !== null);

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this._user.set(JSON.parse(storedUser));
    }
  }

  setUser(user: User): void {
    this._user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    if (user.token) {
      localStorage.setItem('token', user.token);
    }
  }

  getUser(): User | null {
    return this._user();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this._user() !== null;
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload(); // 🔥 Limpia todo
    });
  }
}
