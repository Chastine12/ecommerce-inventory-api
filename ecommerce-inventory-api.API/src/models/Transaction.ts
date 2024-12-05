// src/models/Transaction.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
    transactionID: string;
    productID: mongoose.Types.ObjectId;
    inventoryID: mongoose.Types.ObjectId;
    orderID: mongoose.Types.ObjectId;
    transactionType: 'purchase' | 'sale';
    transactionDate: Date;
    quantity: number;
    payment: number;
}

const TransactionSchema = new Schema<ITransaction>({
    transactionID: { type: String, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    inventoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryID', required: true },
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    transactionType: { type: String, enum: ['purchase', 'sale'], required: true },
    transactionDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true, min: 1 },
    payment: { type: Number, required: true },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
