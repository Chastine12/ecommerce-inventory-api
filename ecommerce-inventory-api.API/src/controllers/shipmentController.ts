import { Request, Response } from "express";
import { Shipment } from "../models/shipment";
import { IShipment } from "../interface/shipmentInterface";
import mongoose from "mongoose";
import { validateShipment } from "../validations/shipmentValidation";

export class ShipmentController {
  // Create a new shipment
  public async createShipment(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming shipment data
      const { error, value: payload } = validateShipment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err: { message: any }) => err.message) });
        return;
      }

      // Prepare shipment data with a new MongoDB ID
      const shipmentData: IShipment = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new shipment
      const shipment = new Shipment(shipmentData);
      const savedShipment = await shipment.save();

      // Return the newly created shipment
      res.status(201).json(savedShipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all shipments
  public async getAllShipments(req: Request, res: Response): Promise<void> {
    try {
      const shipments: IShipment[] = await Shipment.find();
      res.json(shipments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a shipment by ID
  public async getShipmentById(req: Request, res: Response): Promise<void> {
    try {
      const shipment: IShipment | null = await Shipment.findById(req.params.id);

      if (!shipment) {
        res.status(404).json({ message: "Shipment not found" });
        return;
      }

      res.json(shipment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a shipment
  public async updateShipment(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated shipment data
      const { error, value: payload } = validateShipment(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the shipment and get the updated document
      const shipment: IShipment | null = await Shipment.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true }
      );

      if (!shipment) {
        res.status(404).json({ message: "Shipment not found" });
        return;
      }

      res.json(shipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a shipment
  public async deleteShipment(req: Request, res: Response): Promise<void> {
    try {
      const shipment: IShipment | null = await Shipment.findByIdAndDelete(req.params.id);

      if (!shipment) {
        res.status(404).json({ message: "Shipment not found" });
        return;
      }

      res.json({ message: "Shipment deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
