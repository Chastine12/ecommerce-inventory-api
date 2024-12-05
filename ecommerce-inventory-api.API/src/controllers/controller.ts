import { Request, Response } from "express";
import { InventoryItem } from "../models/InventoryItem";
import { IInventoryItem } from "../interface/inventoryinterface";
import mongoose from "mongoose";
import { validateInventoryItem } from "../validations/inventoryvalidation";

export class InventoryController {
  // Create a new inventory item
  // Handles POST requests to add a new item to the inventory
  public async createItem(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming item data against schema rules
      const { error, value: payload } = validateInventoryItem(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err: { message: any; }) => err.message) });
        return;
      }

      // Prepare item data with a new MongoDB ID
      const itemData: IInventoryItem = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new item to the database
      const item = new InventoryItem(itemData);
      const savedItem = await item.save();

      // Return the newly created item with 201 Created status
      res.status(201).json(savedItem);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all inventory items
  // Handles GET requests to retrieve all items from the inventory
  public async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all items from the database
      const items: IInventoryItem[] = await InventoryItem.find();
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get an inventory item by ID
  // Handles GET requests to retrieve a specific item by its ID
  public async getItemById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find the item by ID
      const item: IInventoryItem | null = await InventoryItem.findById(
        req.params.id
      );

      // Return 404 if the item doesn't exist
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }

      // Return the found item
      res.json(item);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update an inventory item
  // Handles PUT/PATCH requests to update an existing inventory item
  public async updateItem(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated item data
      const { error, value: payload } = validateInventoryItem(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the item and get the updated document
      const item: IInventoryItem | null = await InventoryItem.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if the item doesn't exist
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }

      // Return the updated item
      res.json(item);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete an inventory item
  // Handles DELETE requests to remove an item from the inventory
  public async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the item in one operation
      const item: IInventoryItem | null = await InventoryItem.findByIdAndDelete(
        req.params.id
      );

      // Return 404 if the item doesn't exist
      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Item deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}