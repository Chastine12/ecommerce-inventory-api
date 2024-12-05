import express from "express";
import { TransactionController } from "../controllers/transactionController";
import { authMiddleware } from "../Middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create an instance of TransactionController to handle route logic
const transactionController = new TransactionController();

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionItem:
 *       type: object
 *       required:
 *         - amount
 *         - paymentMethod
 *         - status
 *       properties:
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount for the transaction
 *         paymentMethod:
 *           type: string
 *           enum: [credit_card, paypal, bank_transfer]
 *           description: The method of payment
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           description: Status of the transaction
 *         customerId:
 *           type: string
 *           description: ID of the customer making the transaction
 *     TransactionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the transaction
 *         amount:
 *           type: number
 *           format: float
 *           description: Transaction amount
 *         paymentMethod:
 *           type: string
 *           description: Payment method used
 *         status:
 *           type: string
 *           description: Current status of the transaction
 *         customerId:
 *           type: string
 *           description: Associated customer ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the transaction was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last update
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
 * /api/transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionItem'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
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
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionResponse'
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
 * /api/transaction/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Transaction not found
 *
 *   put:
 *     summary: Update transaction status
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Transaction not found
 *
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */

// Transaction Routes:

// POST /api/transaction
router.post("/api/transaction", authMiddleware, transactionController.createTransaction);

// GET /api/transaction
router.get("/api/transaction", authMiddleware, transactionController.getAllTransactions);

// GET /api/transaction/:id
router.get("/api/transaction/:id", authMiddleware, transactionController.getTransactionById);

// PUT /api/transaction/:id
router.put("/api/transaction/:id", authMiddleware, transactionController.updateTransaction);

// DELETE /api/transaction/:id
router.delete("/api/transaction/:id", authMiddleware, transactionController.deleteTransaction);

// Export the router for use in the main application
export default router;