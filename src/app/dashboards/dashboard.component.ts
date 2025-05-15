import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../core/data-access/auth-state.service';
import { MatCardModule } from '@angular/material/card';
import { ChartType, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; // Para las gráficas

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, MatCardModule, NgChartsModule],
})
export class DashboardComponent implements OnInit {
  userName = signal<string>('Usuario');

  // Tarjetas resumen
  totalProducts = signal<number>(120);
  totalSales = signal<number>(350);
  totalUsers = signal<number>(25);
  totalOrders = signal<number>(78);

  // Gráfico 1: Ventas por mes
  salesChartLabels = signal<string[]>([
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]);
  salesChartData = signal<number[]>([
    10, 25, 30, 15, 40, 50, 35, 45, 20, 30, 60, 70
  ]);

  // Gráfico 2: Stock por categoría
  stockChartLabels = signal<string[]>(['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Juguetes']);
  stockChartData = signal<number[]>([100, 60, 80, 40, 50]);

  // Top productos más vendidos (simulados)
  topProducts = signal<{ name: string; sales: number }[]>([
    { name: 'Laptop Dell', sales: 120 },
    { name: 'Smartphone Samsung', sales: 95 },
    { name: 'Zapatillas Nike', sales: 80 },
    { name: 'Refrigeradora LG', sales: 60 },
    { name: 'Bicicleta MTB', sales: 50 },
  ]);

  // Opciones para las gráficas
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  constructor(private authState: AuthStateService) {}

  ngOnInit(): void {
    const user = this.authState.getUser();
    if (user) {
      this.userName.set(user.userName);
    }
  }
}
