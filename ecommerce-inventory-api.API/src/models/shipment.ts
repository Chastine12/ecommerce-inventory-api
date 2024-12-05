// src/models/Shipment.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IShipment extends Document {
    shipmentId: string;
    orderId: mongoose.Types.ObjectId;
    shipmentDate: Date;
    shipmentMethod: string;
    trackingNumber: string;
    status: 'pending' | 'shipped' | 'in transit' | 'delivered' | 'cancelled';
}

const ShipmentSchema = new Schema<IShipment>({
    shipmentId: { type: String, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    shipmentDate: { type: Date, default: Date.now },
    shipmentMethod: { type: String, required: true },
    trackingNumber: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'shipped', 'in transit', 'delivered', 'cancelled'], 
        default: 'pending' 
    },
});

export const Shipment = mongoose.model<IShipment>('Shipment', ShipmentSchema);
