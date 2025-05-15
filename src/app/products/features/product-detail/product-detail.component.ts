import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { Product } from '../../../shared/models/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Obtener el ProductID de la ruta
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      const productIdNumber = Number(productId); // Convierte el string a number
      if (!isNaN(productIdNumber)) {
        this.loadProduct(productIdNumber); // Cargar el producto con el ID convertido
      } else {
       }
    }
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.error('Error al cargar el producto', err);
      },
    });
  }
}
