// src/app/shared/models/product.interface.ts

export interface Product {
  productId: number;          // Cambio de ProductID a productId
  productName: string;        // Cambio de ProductName a productName
  supplierId: number;         // Cambio de SupplierID a supplierId
  categoryId: number;         // Cambio de CategoryID a categoryId
  quantityPerUnit: string;    // Cambio de QuantityPerUnit a quantityPerUnit
  unitPrice: number;          // Cambio de UnitPrice a unitPrice
  unitsInStock: number;       // Cambio de UnitsInStock a unitsInStock
  unitsOnOrder: number;       // Cambio de UnitsOnOrder a unitsOnOrder
  reorderLevel: number;       // Cambio de ReorderLevel a reorderLevel
  discontinued: boolean;      // Cambio de Discontinued a discontinued
}
