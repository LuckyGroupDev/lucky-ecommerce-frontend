/* Orden recomendado en un componente Angular:
  1.Propiedades públicas (que usa el template)
  2.Propiedades privadas (solo internas)
  3.Ciclo de vida Angular (ngOnInit, ngOnDestroy, etc.)
  4.Métodos públicos (que llama el template: botones, filtros)
  5.Métodos privados (lógica interna)
*/
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductStoreService } from '../../data-access/product-store.service';
import { Product } from '../../../shared/models/product.interface';
import { ConfirmationDialogComponent } from '../../../shared/ui/dialog/confirmation-dialog.component';
import { effect } from '@angular/core';

import { DialogService } from '../../../shared/ui/dialog'; // Ajusta el path según tu estructura


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {

  // 1. Propiedades públicas (accesibles en el template)
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'productId',
    'productName',
    'supplierId',
    'categoryId',
    'quantityPerUnit',
    'unitPrice',
    'unitsInStock',
    'unitsOnOrder',
    'reorderLevel',
    'actions',
  ];

  // 2. Propiedades privadas (uso interno)
  private productStore = inject(ProductStoreService);
  private dialog = inject(MatDialog);
  private dialogService = inject(DialogService);  // Usamos el servicio de diálogo

  // Efecto que actualiza la tabla cuando los productos cambian
  private readonly updateTableEffect = effect((): void => {
    const currentProducts = this.productStore.getProducts(); // Leer del store
    console.log('📦 Productos que vienen del STORE:', currentProducts);
    this.dataSource.data = currentProducts; // Actualiza la tabla
  });

  // 3. Ciclo de vida Angular
  ngOnInit(): void {
    this.loadProducts(); // Cargar productos al iniciar el componente
  }

  ngOnDestroy(): void {
    // Limpiar cualquier suscripción si es necesario
  }

  // 4. Métodos públicos (usados desde el template)
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteConfirmation(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de eliminar este producto?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct(productId);
      }
    });
  }

  openAddDialog(): void {
    const emptyProduct: Product = {
      productId: 0,
      productName: '',
      supplierId: 0,
      categoryId: 0,
      quantityPerUnit: '',
      unitPrice: 0,
      unitsInStock: 0,
      unitsOnOrder: 0,
      reorderLevel: 0,
      discontinued: false,  // Añadido aquí para cumplir con el tipo Product

    };

    this.dialogService.openEditDialog('add', emptyProduct).subscribe((result) => {
      if (result) {
        // Aquí recibimos el producto que se agrega
        console.log('Producto agregado:', result);
        this.productStore.createProduct(result);  // 🔥 Aquí ya mandas a guardar
      }
    });

    

  }
 

  openEditDialog(product: Product): void {
    // Cuando abrimos el diálogo de edición, nos aseguramos de pasar el producto completo,
    // incluido el productId.
      // Verificar si el producto tiene un productId antes de abrir el diálogo
  if (!product.productId) {
    console.error('No se puede editar el producto, el productId es necesario.');
    return;  // Salir si no hay productId
  }
    this.dialogService.openEditDialog('edit', product).subscribe((result) => {
      if (result) {
        console.log('Producto editado:', result);
        if (result.productId) {
          // Si el producto tiene un productId, lo actualizamos
          this.productStore.updateProduct(result);  // Actualizar el producto usando el productId
        } else {
          console.error('No se pudo editar el producto, el productId es necesario.');
        }
      }
    });
  }






  // 5. Métodos privados
  private loadProducts(): void {
    // Cargar los productos desde el servicio (llama a la API)
    this.productStore.loadProducts();
  }

  private deleteProduct(productId: number): void {
    this.productStore.deleteProduct(productId);
  }

}



//openEditDialog, openAddDialog