// src/models/Supplier.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ISupplier extends Document {
    supplierID: string;
    supplierName: string;
    contactInfo: string;
    address: string;
}

const SupplierSchema = new Schema<ISupplier>({
    supplierID: { type: String, required: true },
    supplierName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    address: { type: String, required: true },
});

export const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema);
