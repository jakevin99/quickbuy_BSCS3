import UserModel, { UserOutput } from '../models/User';

export const getAllNonAdminUsers = async (): Promise<UserOutput[]> => {
  return UserModel.getAllNonAdmin();
};

export const getUserById = async (userId: string | number) => {
  return UserModel.findById(userId);
};

export const deleteUserById = async (userId: string | number): Promise<void> => {
  await UserModel.delete(userId);
}; 