import { Document } from "mongoose";

// Interface for a Supplier document
export interface ISupplier extends Document {
  supplierID: string;        // Primary key, unique identifier for the supplier
  supplierName: string;      // Name of the supplier
  contactInfo: string;       // Contact information for the supplier
  address: string;           // Address of the supplier
}
