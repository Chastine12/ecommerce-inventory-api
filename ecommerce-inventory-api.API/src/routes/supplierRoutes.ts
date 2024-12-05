import express from "express";
import { SupplierController } from "../controllers/supplierController";
import { authMiddleware } from "../Middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create an instance of SupplierController to handle route logic
const supplierController = new SupplierController();

/**
 * @swagger
 * tags:
 *   name: Supplier
 *   description: Supplier management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SupplierItem:
 *       type: object
 *       required:
 *         - name
 *         - contactInfo
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the supplier
 *         contactInfo:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: Email address of the supplier
 *             phone:
 *               type: string
 *               description: Phone number of the supplier
 *         address:
 *           type: string
 *           description: Address of the supplier
 *     SupplierResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the supplier
 *         name:
 *           type: string
 *           description: Name of the supplier
 *         contactInfo:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               description: Email address of the supplier
 *             phone:
 *               type: string
 *               description: Phone number of the supplier
 *         address:
 *           type: string
 *           description: Address of the supplier
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the supplier was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the supplier was last updated
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: The field that caused the validation error
 *               message:
 *                 type: string
 *                 description: Details about the validation error
 */

/**
 * @swagger
 * /api/supplier:
 *   post:
 *     summary: Add a new supplier
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupplierItem'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupplierResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SupplierResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/supplier/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupplierResponse'
 *       404:
 *         description: Supplier not found
 *
 *   put:
 *     summary: Update supplier details
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SupplierItem'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupplierResponse'
 *       404:
 *         description: Supplier not found
 *
 *   delete:
 *     summary: Delete supplier
 *     tags: [Supplier]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       204:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 */

// Supplier Routes:

// POST /api/supplier
router.post("/api/supplier", authMiddleware, supplierController.createSupplier);

// GET /api/supplier
router.get("/api/supplier", authMiddleware, supplierController.getAllSuppliers);

// GET /api/supplier/:id
router.get("/api/supplier/:id", authMiddleware, supplierController.getSupplierById);

// PUT /api/supplier/:id
router.put("/api/supplier/:id", authMiddleware, supplierController.updateSupplier);

// DELETE /api/supplier/:id
router.delete("/api/supplier/:id", authMiddleware, supplierController.deleteSupplier);

// Export the router for use in the main application
export default router;
