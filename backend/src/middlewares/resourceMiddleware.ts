import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorMiddleware';

/**
 * Generic middleware factory for checking if a user owns a resource or is an admin
 * Helps reduce duplicate ownership checks in controllers
 * 
 * @param fetchResource Function to fetch the resource by ID
 * @param ownershipField Field on the resource that contains the owner's ID
 * @returns Middleware function that validates ownership
 */
export function checkResourceOwnership<T>(
  fetchResource: (id: string) => Promise<T | null>,
  ownershipField: keyof T = 'seller_id' as keyof T
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as any;
      const resourceId = req.params.id;
      
      if (!user) {
        throw new ApiError(401, 'Authentication required');
      }
      
      // Admins can access any resource
      if (user.role === 'admin') {
        return next();
      }
      
      // Get the resource
      const resource = await fetchResource(resourceId);
      
      // Check if resource exists
      if (!resource) {
        throw new ApiError(404, 'Resource not found');
      }
      
      // Check if user owns the resource
      if ((resource as any)[ownershipField] !== user.userId) {
        throw new ApiError(403, 'You do not have permission to access this resource');
      }
      
      // User is authorized to access this resource
      next();
    } catch (error) {
      next(error);
    }
  };
} 