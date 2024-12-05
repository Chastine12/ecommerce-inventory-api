import { Document } from "mongoose";

// Interface for a Product document
export interface IProduct extends Document {
  name: string;               // Name of the product
  description: string;        // Detailed description of the product
  categoryId: string;           // Category the product belongs to
  price: number;              // Price of the product
  stockQuantity: number;      // Quantity of the product available in stock
  supplierId: string;         // Foreign key, reference to the supplier providing the product
  createdAt: Date;            // Timestamp for when the product was added
  updatedAt: Date;            // Timestamp for when the product details were last updated
}
