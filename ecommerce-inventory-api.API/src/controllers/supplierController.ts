import { Request, Response } from "express";
import { Supplier } from "../models/Supplier";
import { ISupplier } from "../interface/supplierInterface";
import mongoose from "mongoose";
import { validateSupplier } from "../validations/supplierValidation";

export class SupplierController {
  // Create a new supplier
  public async createSupplier(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming supplier data
      const { error, value: payload } = validateSupplier(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err: { message: any }) => err.message) });
        return;
      }

      // Prepare supplier data with a new MongoDB ID
      const supplierData: ISupplier = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new supplier
      const supplier = new Supplier(supplierData);
      const savedSupplier = await supplier.save();

      // Return the newly created supplier
      res.status(201).json(savedSupplier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all suppliers
  public async getAllSuppliers(req: Request, res: Response): Promise<void> {
    try {
      const suppliers: ISupplier[] = await Supplier.find();
      res.json(suppliers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a supplier by ID
  public async getSupplierById(req: Request, res: Response): Promise<void> {
    try {
      const supplier: ISupplier | null = await Supplier.findById(req.params.id);

      if (!supplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }

      res.json(supplier);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a supplier
  public async updateSupplier(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated supplier data
      const { error, value: payload } = validateSupplier(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the supplier and return the updated document
      const supplier: ISupplier | null = await Supplier.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true }
      );

      if (!supplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }

      res.json(supplier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a supplier
  public async deleteSupplier(req: Request, res: Response): Promise<void> {
    try {
      const supplier: ISupplier | null = await Supplier.findByIdAndDelete(req.params.id);

      if (!supplier) {
        res.status(404).json({ message: "Supplier not found" });
        return;
      }

      res.json({ message: "Supplier deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
