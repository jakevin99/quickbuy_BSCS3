import ProductModel, { Product, ProductInput } from '../models/Product';

export interface ProductFilters {
  category?: string;
  sort?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedProductsResult {
  products: Product[];
  totalItems: number;
  page: number;
  pageSize: number;
}

export const getAllProducts = async (filters?: ProductFilters): Promise<PaginatedProductsResult> => {
  const page = filters?.page || 1;
  const pageSize = filters?.pageSize || 10;
  
  // Get total count first for pagination metadata
  const totalItems = await ProductModel.count(filters);
  
  // Get paginated results
  const products = await ProductModel.findAll({
    ...filters,
    offset: (page - 1) * pageSize,
    limit: pageSize
  });
  
  return {
    products,
    totalItems,
    page,
    pageSize
  };
};

export const getProductById = async (id: string | number): Promise<Product | null> => {
  return ProductModel.findById(id);
};

export const createProduct = async (productData: ProductInput): Promise<number> => {
  return ProductModel.create(productData);
};

export const updateProduct = async (id: string | number, productData: Partial<ProductInput>): Promise<void> => {
  await ProductModel.update(id, productData);
};

export const deleteProduct = async (id: string | number): Promise<void> => {
  await ProductModel.delete(id);
}; 