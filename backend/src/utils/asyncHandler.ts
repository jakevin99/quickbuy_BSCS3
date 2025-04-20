import { Request, Response, NextFunction } from 'express';

/**
 * Async handler wrapper to eliminate try-catch blocks in route controllers
 * @param fn Function to execute
 * @returns Express middleware function with error handling
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 