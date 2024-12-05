import { Request, Response } from "express";
import { Product } from "../models/product";
import { IProduct } from "../interface/productInterface";
import mongoose from "mongoose";
import { validateProduct } from "../validations/productValidation";

export class ProductController {
  // Create a new product
  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming product data
      const { error, value: payload } = validateProduct(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err: { message: any }) => err.message) });
        return;
      }

      // Prepare product data with a new MongoDB ID
      const productData: IProduct = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new product
      const product = new Product(productData);
      const savedProduct = await product.save();

      // Return the newly created product with 201 Created status
      res.status(201).json(savedProduct);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all products
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: IProduct[] = await Product.find();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a product by ID
  public async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product: IProduct | null = await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a product
  public async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated product data
      const { error, value: payload } = validateProduct(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the product and get the updated document
      const product: IProduct | null = await Product.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // Returns the modified document
      );

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.json(product);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a product
  public async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const product: IProduct | null = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
