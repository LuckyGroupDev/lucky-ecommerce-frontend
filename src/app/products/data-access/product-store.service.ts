import { Injectable } from '@angular/core';
import { signal } from '@angular/core';  // Importamos Signal
import { Product } from '../../shared/models/product.interface';
import { ProductService } from './product.service'; // Servicio que maneja la API

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  
  // Usamos signal para almacenar los productos
  private products = signal<Product[]>([]);

  constructor(private productService: ProductService) {}

  // Método para cargar productos
  loadProducts(): void {
    
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products.set(products); // Actualizamos el Signal
      console.log('📦 Productos cargados en el store:', this.products()); // Mostrar productos cargados

    });
  }

  // Accedemos a los productos directamente desde la signal
  getProducts() {
    return this.products();  // Obtenemos el valor actual de los productos
  }

    // 🔥 Aquí agregas el nuevo método para obtener 1 producto por ID
    getProductById(productId: number): Product | undefined {
      return this.products().find(p => p.productId === productId);
    }

  // Método para eliminar producto
  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      // Volver a cargar los productos después de eliminar uno
      this.loadProducts();
    });
  }
  // Método para crear producto
createProduct(newProduct: Product): void {
  this.productService.createProduct(newProduct).subscribe((createdProduct: Product) => {
    // Agregar el nuevo producto a la lista actual
    this.products.set([...this.products(), createdProduct]);
    console.log('✅ Producto creado:', createdProduct);
  });
}

// Método para actualizar producto
updateProduct(updatedProduct: Product): void {
  this.productService.updateProduct(updatedProduct).subscribe((product: Product) => {
    // Actualizar en la lista local
    const updatedList = this.products().map(p => p.productId === product.productId ? product : p);
    this.products.set(updatedList);
    console.log('♻️ Producto actualizado:', product);
  });
}

}
