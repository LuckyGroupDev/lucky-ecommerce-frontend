 import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent, EditDialogData } from '././edit-dialog/edit-dialog.component';
import { Product } from '../../../shared/models/product.interface';
import { Injectable, inject } from '@angular/core';
import { ProductStoreService } from '../../../products/data-access/product-store.service';

@Injectable({
  providedIn: 'root', // Esto asegura que el servicio sea global y esté disponible en toda la aplicación
})

export class DialogService {
  private dialog = inject(MatDialog);

  openEditDialog(mode: 'add' | 'edit', product: Product) {
    return this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { mode, product } as EditDialogData,
    }).afterClosed();
  }
}
