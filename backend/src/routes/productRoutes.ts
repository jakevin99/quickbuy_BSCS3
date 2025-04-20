import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";
import { authenticateToken, hasRole } from "../middlewares/authMiddleware";
import { checkResourceOwnership } from "../middlewares/resourceMiddleware";
import { asyncHandler } from "../utils/asyncHandler";
import * as productService from "../services/productService";

const router = express.Router();

// Create middleware for product ownership
const checkProductOwnership = checkResourceOwnership(
  productService.getProductById,
  'seller_id'
);

// Public routes
router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));

// Protected routes - require seller role
router.post("/", 
  authenticateToken,
  hasRole('seller'),
  asyncHandler(createProduct)
);

// Protected routes - require ownership
router.put("/:id", 
  authenticateToken,
  checkProductOwnership, 
  asyncHandler(updateProduct)
);

router.delete("/:id", 
  authenticateToken,
  checkProductOwnership, 
  asyncHandler(deleteProduct)
);

export default router; 