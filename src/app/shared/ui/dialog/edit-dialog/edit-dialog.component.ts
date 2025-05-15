import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';  // Importar ReactiveFormsModule
import { Product } from '../../../models/product.interface';
import { MatInputModule } from '@angular/material/input';  // Importar MatInputModule para inputs de Material
import { MatFormFieldModule } from '@angular/material/form-field'; // Para usar mat-form-field
import { MatDialogModule } from '@angular/material/dialog'; // Asegúrate de importar MatDialogModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule para botones
import { CommonModule } from '@angular/common';


export interface EditDialogData {
  mode: 'add' | 'edit';
  product: Product;
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,  // Importa CommonModule para las directivas estructurales
    ReactiveFormsModule,  // Importamos ReactiveFormsModule aquí
    MatInputModule,       // Importamos MatInputModule
    MatFormFieldModule,   // Importamos MatFormFieldModule
    MatDialogModule,      // Importamos MatDialogModule para usar mat-dialog-actions
    MatButtonModule,      // Importamos MatButtonModule para los botones
  ],
})
export class EditDialogComponent {
  productForm: FormGroup;  // Definimos un FormGroup

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private fb: FormBuilder // Usamos FormBuilder para crear el formulario de manera más fácil
  ) {
    // Hacemos una copia para no mutar el original hasta que guarde
    this.productForm = this.fb.group({
      productName: [data.product.productName, Validators.required],  // Validación: 'required'
      supplierId: [data.product.supplierId],
      categoryId: [data.product.categoryId],
      quantityPerUnit: [data.product.quantityPerUnit],
      unitPrice: [data.product.unitPrice, Validators.required], // Validación: 'required'
      unitsInStock: [data.product.unitsInStock],
      unitsOnOrder: [data.product.unitsOnOrder],
      reorderLevel: [data.product.reorderLevel],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.productForm.valid) {  // Comprobamos si el formulario es válido antes de guardarlo
      this.dialogRef.close(this.productForm.value); // Cierra el modal y pasa los datos del formulario
    } else {
      // Si el formulario no es válido, podríamos mostrar un mensaje de error o algo
     }
  }
}
