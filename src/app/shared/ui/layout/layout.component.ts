import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet,RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    FooterComponent
  ],
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen = true;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit(): void {
    // Observamos los cambios en el tamaño de la pantalla y ajustamos el sidenav
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSidenavOpen = !result.matches; // Si es móvil, se cierra
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
