import { Component, Output, EventEmitter, AfterViewInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../../../app/core/data-access/auth-state.service'; // ✅ Usa tu authState limpio

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    CommonModule,
    FormsModule,
  ]
})
export class NavbarComponent implements AfterViewInit {
  @Output() toggleSidenav = new EventEmitter<void>(); // Emite un evento para alternar la barra lateral

  showSearch = false;
  searchQuery: string = '';

  // ✅ Usamos `isAuthenticated` como signal computado
  isAuthenticated = computed(() => this.authState.isAuthenticated());

  constructor(
    private router: Router,
    private authState: AuthStateService  // ✅ Usa AuthState limpio aquí
  ) {}

  ngAfterViewInit(): void {
    // Aquí podemos realizar alguna lógica si es necesario
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onSearchChange(): void {
   }

  onClearSearch(): void {
    this.searchQuery = '';
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
     this.authState.logout();  // ✅ Usa el método centralizado que limpia todo
    this.router.navigate(['/auth/login']);
  }

  toggleTheme(): void {
   }
}
