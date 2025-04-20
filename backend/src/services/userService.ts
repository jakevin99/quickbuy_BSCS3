import UserModel, { UserInput, User, UserOutput } from '../models/User';
import { generateToken } from '../utils/jwt';
import { ApiError } from '../middlewares/errorMiddleware';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findByEmail(email);
};

export const findUserById = async (id: number | string): Promise<User | null> => {
  return UserModel.findById(id);
};

export const checkExistingUser = async (email: string, username: string, shop_name?: string) => {
  return UserModel.checkExisting(email, username, shop_name);
};

export const createUser = async (userData: UserInput): Promise<number> => {
  return UserModel.create(userData);
};

export const validatePassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  return UserModel.comparePassword(inputPassword, storedPassword);
};

export const generateAuthToken = (userId: number, role: string): string => {
  return generateToken({
    userId,
    role
  });
};

export const getUserProfile = async (userId: number | string): Promise<UserOutput | null> => {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    return null;
  }
  
  // Strip sensitive information
  const { password, ...userProfile } = user;
  return userProfile as UserOutput;
}; 