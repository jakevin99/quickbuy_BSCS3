// Base URL for the backend API
const BASE_URL = "http://localhost:3000/api";
const API_VERSION = "v1";

// API resource endpoints with versioning
const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/register`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    PROFILE: `${API_VERSION}/auth/profile`,
  },
  ADMIN: {
    USERS: `${API_VERSION}/admin/users`,
    DELETE_USER: (id: string) => `${API_VERSION}/admin/users/${id}`,
  },
  PRODUCTS: {
    LIST: `${API_VERSION}/products`,
    GET: (id: string) => `${API_VERSION}/products/${id}`,
    CREATE: `${API_VERSION}/products`,
    UPDATE: (id: string) => `${API_VERSION}/products/${id}`,
    DELETE: (id: string) => `${API_VERSION}/products/${id}`,
  },
  ORDERS: {
    LIST: `${API_VERSION}/orders`,
    GET: (id: string) => `${API_VERSION}/orders/${id}`,
    CREATE: `${API_VERSION}/orders`,
  }
};

// Request methods
enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

// Standard API Response interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    pagination?: PaginationMeta;
    version: string;
    timestamp: string;
  };
  errors?: any;
}

// Pagination metadata interface
export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Pagination parameters interface
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Import types needed for API method signatures
import type { 
  LoginCredentials, 
  LoginResponse, 
  User, 
  RegisterData,
  Product,
  Order
} from '$lib/types/index.js';

// Generic fetch function with authentication
async function fetchWithAuth<T>(
  endpoint: string, 
  method: Method = Method.GET, 
  data?: any, 
  customHeaders?: HeadersInit
): Promise<ApiResponse<T>> {
  // Get auth token from localStorage
  const token = localStorage.getItem("token");

  // Set up headers with auth token if available
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  // Configure request options
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
    ...(data && { body: JSON.stringify(data) }),
  };

  // Make the request
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);

  // Handle non-OK responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
    throw new Error(errorData.message || errorData.status?.message || `Request failed with status ${response.status}`);
  }

  // Parse and return response data
  return response.json();
}

// API service with resource-specific methods
export const api = {
  // Generic HTTP methods
  get: <T>(endpoint: string, customHeaders?: HeadersInit): Promise<ApiResponse<T>> => 
    fetchWithAuth<T>(endpoint, Method.GET, undefined, customHeaders),
  
  post: <T>(endpoint: string, data: any, customHeaders?: HeadersInit): Promise<ApiResponse<T>> => 
    fetchWithAuth<T>(endpoint, Method.POST, data, customHeaders),
  
  put: <T>(endpoint: string, data: any, customHeaders?: HeadersInit): Promise<ApiResponse<T>> => 
    fetchWithAuth<T>(endpoint, Method.PUT, data, customHeaders),
  
  patch: <T>(endpoint: string, data: any, customHeaders?: HeadersInit): Promise<ApiResponse<T>> => 
    fetchWithAuth<T>(endpoint, Method.PATCH, data, customHeaders),
  
  delete: <T>(endpoint: string, customHeaders?: HeadersInit): Promise<ApiResponse<T>> => 
    fetchWithAuth<T>(endpoint, Method.DELETE, undefined, customHeaders),

  // Resource-specific methods following RESTful principles
  auth: {
    login: (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => 
      fetchWithAuth<LoginResponse>(ENDPOINTS.AUTH.LOGIN, Method.POST, credentials),
    
    register: (userData: RegisterData): Promise<ApiResponse<User>> => 
      fetchWithAuth<User>(ENDPOINTS.AUTH.REGISTER, Method.POST, userData),
    
    logout: (): Promise<ApiResponse<null>> => 
      fetchWithAuth<null>(ENDPOINTS.AUTH.LOGOUT, Method.POST),
      
    profile: (): Promise<ApiResponse<User>> =>
      fetchWithAuth<User>(ENDPOINTS.AUTH.PROFILE, Method.GET),
  },
  
  admin: {
    getUsers: (): Promise<ApiResponse<User[]>> => 
      fetchWithAuth<User[]>(ENDPOINTS.ADMIN.USERS, Method.GET),
    
    deleteUser: (id: string): Promise<ApiResponse<null>> => 
      fetchWithAuth<null>(ENDPOINTS.ADMIN.DELETE_USER(id), Method.DELETE),
  },
  
  products: {
    getAll: (params?: { 
      category?: string; 
      sort?: string; 
      search?: string; 
      minPrice?: number; 
      maxPrice?: number; 
      brand?: string; 
      page?: number; 
      pageSize?: number;
    }): Promise<ApiResponse<Product[]>> => {
      const queryParams = params ? 
        `?${new URLSearchParams(Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}) as Record<string, string>
        ).toString()}` : '';
      return fetchWithAuth<Product[]>(`${ENDPOINTS.PRODUCTS.LIST}${queryParams}`, Method.GET);
    },
    
    getById: (id: string | number): Promise<ApiResponse<Product>> => 
      fetchWithAuth<Product>(ENDPOINTS.PRODUCTS.GET(id.toString()), Method.GET),
    
    create: (productData: Partial<Product>): Promise<ApiResponse<{id: number}>> => 
      fetchWithAuth<{id: number}>(ENDPOINTS.PRODUCTS.CREATE, Method.POST, productData),
    
    update: (id: string | number, productData: Partial<Product>): Promise<ApiResponse<null>> => 
      fetchWithAuth<null>(ENDPOINTS.PRODUCTS.UPDATE(id.toString()), Method.PUT, productData),
    
    delete: (id: string | number): Promise<ApiResponse<null>> => 
      fetchWithAuth<null>(ENDPOINTS.PRODUCTS.DELETE(id.toString()), Method.DELETE),
  },
  
  orders: {
    getAll: (params?: PaginationParams): Promise<ApiResponse<Order[]>> => {
      const queryParams = params ? 
        `?${new URLSearchParams(Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
          .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}) as Record<string, string>
        ).toString()}` : '';
      return fetchWithAuth<Order[]>(`${ENDPOINTS.ORDERS.LIST}${queryParams}`, Method.GET);
    },
    
    getById: (id: string | number): Promise<ApiResponse<Order>> => 
      fetchWithAuth<Order>(ENDPOINTS.ORDERS.GET(id.toString()), Method.GET),
    
    create: (orderData: any): Promise<ApiResponse<{id: number}>> => 
      fetchWithAuth<{id: number}>(ENDPOINTS.ORDERS.CREATE, Method.POST, orderData),
  }
};
