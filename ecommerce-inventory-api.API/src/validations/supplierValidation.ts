import Joi from "joi"; // Import Joi validation library

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       required:
 *         - supplierID
 *         - supplierName
 *         - contactInfo
 *         - address
 *       properties:
 *         supplierID:
 *           type: string
 *           description: Unique identifier for the supplier
 *           example: "SUP12345"
 *         supplierName:
 *           type: string
 *           maxLength: 100
 *           description: Name of the supplier
 *           example: "ABC Electronics Co."
 *         contactInfo:
 *           type: string
 *           maxLength: 100
 *           description: Contact information for the supplier
 *           example: "support@abcelectronics.com"
 *         address:
 *           type: string
 *           maxLength: 200
 *           description: Address of the supplier
 *           example: "123 Main Street, Springfield, USA"
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */

// Define a validation schema for supplier data
const supplierValidationSchema = Joi.object({
  // Supplier ID validation
  supplierID: Joi.string().required().messages({
    "any.required": "Supplier ID is required",
  }),

  // Supplier Name validation
  supplierName: Joi.string().max(100).required().messages({
    "string.max": "Supplier name cannot exceed 100 characters",
    "any.required": "Supplier name is required",
  }),

  // Contact Info validation
  contactInfo: Joi.string().max(100).required().messages({
    "string.max": "Contact information cannot exceed 100 characters",
    "any.required": "Contact information is required",
  }),

  // Address validation
  address: Joi.string().max(200).required().messages({
    "string.max": "Address cannot exceed 200 characters",
    "any.required": "Address is required",
  }),
});

// Helper function to validate supplier data
export const validateSupplier = (supplierData: any) => {
  return supplierValidationSchema.validate(supplierData, { abortEarly: false });
};

export default supplierValidationSchema;
