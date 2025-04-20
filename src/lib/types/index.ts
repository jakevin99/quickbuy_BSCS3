// User interfaces
export interface User {
  id: string | number;
  username: string;
  email: string;
  name?: string;
  role?: string;
  shop_name?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// Authentication interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
  shop_name?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

// Product interfaces
export interface Product {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  stock?: number;
  seller_id?: number | string;
  discountPercentage: number;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

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

// Pagination interfaces
export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: Error | null;
  filters: ProductFilters;
  pagination: PaginationInfo;
}

// Order interfaces
export interface OrderItem {
  productId: number | string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order {
  id: string | number;
  userId: string | number;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// API response interfaces
export interface ApiResponseMeta {
  version: string;
  timestamp: string;
  pagination?: PaginationInfo;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: ApiResponseMeta;
  errors?: any;
}

// Legacy API response interfaces - kept for backward compatibility
export interface LegacyApiResponse<T> {
  data: T;
  status: {
    code: number;
    message: string;
  };
}

export interface LegacyPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 