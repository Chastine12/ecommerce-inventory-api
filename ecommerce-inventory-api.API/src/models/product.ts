// src/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: String;
    supplierId: String;
    createdDate: Date;
    updatedDate: Date;
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    categoryId: { type: String, required: true },
    supplierId: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
