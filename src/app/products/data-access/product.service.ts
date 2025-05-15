// src/app/products/data-access/product.service.ts

import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/data-access/http.service';
import { Observable, throwError } from 'rxjs';
import { Product } from '../../shared/models/product.interface';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/Products`;  // ahora modular

  constructor(private http: HttpService) { }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetAll`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener un producto por su ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/Get/${productId}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/Insert/`, product).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Actualizar un producto existente
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/Update/${product.productId}`, product).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Eliminar un producto
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete/${productId}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Método privado para manejar errores
  private handleError(error: any): Observable<never> {
    return throwError(() => new Error('Error en la solicitud HTTP'));
  }
}
