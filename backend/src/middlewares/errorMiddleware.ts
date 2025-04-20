import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseHandler';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Use the response handler for consistent responses
  sendError(
    res, 
    message, 
    statusCode, 
    process.env.NODE_ENV === 'production' ? null : { stack: err.stack }
  );
};

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
} 