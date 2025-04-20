import { Request, Response } from 'express';
import * as adminService from '../services/adminService';
import { ApiError } from '../middlewares/errorMiddleware';
import { sendSuccess } from '../utils/responseHandler';

// @desc    Get all non-admin users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await adminService.getAllNonAdminUsers();
  sendSuccess(res, users, 'Users retrieved successfully');
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  const user = await adminService.getUserById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.role === 'admin') {
    throw new ApiError(403, 'Cannot delete admin users');
  }

  await adminService.deleteUserById(userId);
  sendSuccess(res, null, 'User deleted successfully');
};