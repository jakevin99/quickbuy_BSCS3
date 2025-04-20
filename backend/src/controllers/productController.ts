import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { ApiError } from '../middlewares/errorMiddleware';
import { sendSuccess, createPaginationMeta } from '../utils/responseHandler';
import { Product, ProductInput } from '../models/Product';

// @desc    Get all products with optional filtering and pagination
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  const { 
    category, 
    sort, 
    search, 
    minPrice, 
    maxPrice, 
    brand,
    page = '1',
    pageSize = '10'
  } = req.query;
  
  const filters = {
    category: category as string,
    sort: sort as string,
    search: search as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    brand: brand as string,
    page: parseInt(page as string, 10),
    pageSize: parseInt(pageSize as string, 10)
  };
  
  const { products, totalItems, page: currentPage, pageSize: itemsPerPage } = 
    await productService.getAllProducts(filters);
  
  // Create pagination metadata
  const paginationMeta = createPaginationMeta(totalItems, currentPage, itemsPerPage);
  
  sendSuccess<Product[]>(res, products, 'Products retrieved successfully', 200, paginationMeta);
};

// @desc    Get product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  
  const product = await productService.getProductById(productId);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  sendSuccess<Product>(res, product, 'Product retrieved successfully');
};

// @desc    Create a new product
// @route   POST /api/v1/products
// @access  Private/Seller (role checked by middleware)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as any;
  
  // Type-safe input validation
  const productData: ProductInput = { 
    ...req.body, 
    seller_id: user.userId 
  };
  
  const productId = await productService.createProduct(productData);
  
  sendSuccess<{id: number}>(res, { id: productId }, 'Product created successfully', 201);
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id
// @access  Private/Seller (ownership checked by middleware)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  
  // Type-safe partial product data
  const productData: Partial<ProductInput> = req.body;
  
  // Ownership check is now handled by middleware
  await productService.updateProduct(productId, productData);
  
  sendSuccess<null>(res, null, 'Product updated successfully');
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id
// @access  Private/Seller (ownership checked by middleware)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  
  // Ownership check is now handled by middleware
  await productService.deleteProduct(productId);
  
  sendSuccess<null>(res, null, 'Product deleted successfully');
}; 