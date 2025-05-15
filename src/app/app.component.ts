import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStateService } from './core/data-access/auth-state.service'; // Importa tu servicio



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lucky-ecommerce';
  constructor(private authStateService: AuthStateService) {
    // Esto asegura que se inicialice y dispare el console.log del localStorage
   }
}
