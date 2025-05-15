import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponse } from '../../shared/models/api-response.interface';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(url, { params: this.buildParams(params) })
      .pipe(
        map((response) => {
          console.log('Respuesta completa en GET:', response);  // Depura la respuesta aquí
          if (response && response.data) {
            return response.data; // Si 'data' está presente, devuélvelo
          } else {
            console.error('La propiedad "data" no está presente en la respuesta', response);
            return {} as T; // Retorna un objeto vacío si no existe 'data'
          }
        }),
        catchError((error) => this.handleError(error)) // Manejo de errores
      );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(url, body)
      .pipe(
        map((response) => {
          console.log('Respuesta completa en POST:', response);  // Depura la respuesta aquí
          if (response && response.data) {
            return response.data; // Si 'data' está presente, devuélvelo
          } else {
            console.error('La propiedad "data" no está presente en la respuesta', response);
            return {} as T; // Retorna un objeto vacío si no existe 'data'
          }
        }),
        catchError((error) => this.handleError(error)) // Manejo de errores
      );
  }
  

  put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(url, body)
      .pipe(
        map((response) => {
          console.log('Respuesta PUT:', response); // Muestra la respuesta completa del PUT
          return response.data; // Extrae los datos
        }),
        catchError((error) => this.handleError(error)) // Manejo de errores
      );
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<ApiResponse<T>>(url)
      .pipe(
        map((response) => {
          console.log('Respuesta DELETE:', response); // Muestra la respuesta completa del DELETE
          return response.data; // Extrae los datos
        }),
        catchError((error) => this.handleError(error)) // Manejo de errores
      );
  }

  // Método privado para construir params de forma limpia y convertir las claves a camelCase
  private buildParams(params?: Record<string, any>): HttpParams | undefined {
    if (!params) {
      return undefined;
    }

    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        const camelCaseKey = this.toCamelCase(key); // Convertimos la clave a camelCase
        httpParams = httpParams.set(camelCaseKey, params[key]);
      }
    });
    return httpParams;
  }

  // Método privado para convertir un string a camelCase
  private toCamelCase(key: string): string {
    return key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
  }

  // Método privado para manejar errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    // Puedes personalizar el manejo de errores aquí, por ejemplo, devolviendo un mensaje o un valor predeterminado.
    return throwError(() => new Error('Error en la solicitud HTTP')); // Lanza un error para ser manejado por el código que consuma el servicio
  }
}
