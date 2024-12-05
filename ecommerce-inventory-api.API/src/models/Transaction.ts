// src/models/Transaction.ts
import { string } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
    transactionID: string;
    productID: String;
    inventoryID: String;
    orderID: String;
    transactionType: 'purchase' | 'sale';
    transactionDate: Date;
    quantity: number;
    payment: number;
}

const TransactionSchema = new Schema<ITransaction>({
    transactionID: { type: String, required: true },
    productID: { type: String, required: true },
    inventoryID: { type: String, required: true },
    orderID: { type: String, ref: 'Order', required: true },
    transactionType: { type: String, enum: ['purchase', 'sale'], required: true },
    transactionDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true, min: 1 },
    payment: { type: Number, required: true },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
