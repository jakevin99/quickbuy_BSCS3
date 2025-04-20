import { Response } from 'express';

/**
 * Pagination metadata interface
 */
export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Standard API response interface
 */
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

// Current API version
const API_VERSION = 'v1';

/**
 * Standard success response with pagination support
 */
export const sendSuccess = <T>(
  res: Response,
  data: T | null = null,
  message = 'Operation successful',
  statusCode = 200,
  paginationMeta?: PaginationMeta
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    meta: {
      version: API_VERSION,
      timestamp: new Date().toISOString()
    }
  };

  if (data !== null) {
    response.data = data;
  }

  if (paginationMeta) {
    response.meta.pagination = paginationMeta;
  }

  res.status(statusCode).json(response);
};

/**
 * Standard error response
 */
export const sendError = (
  res: Response,
  message = 'An error occurred',
  statusCode = 500,
  errors: any = null
): void => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    meta: {
      version: API_VERSION,
      timestamp: new Date().toISOString()
    }
  };

  if (errors !== null) {
    response.errors = errors;
  }

  res.status(statusCode).json(response);
};

/**
 * Generate pagination metadata
 */
export const createPaginationMeta = (
  totalItems: number, 
  page: number, 
  pageSize: number
): PaginationMeta => {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return {
    currentPage: page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}; 