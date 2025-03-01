import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'quickbuybscs3b';
const JWT_EXPIRES_IN = '24h';

export interface JwtPayload {
  userId: number;
  role: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 