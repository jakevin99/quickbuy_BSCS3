import { RowDataPacket } from 'mysql2/promise';
import pool from './db';
import bcrypt from 'bcryptjs';

export interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  shop_name: string | null;
  created_at: Date;
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
  role: string;
  shop_name?: string;
}

export interface UserOutput {
  id: number;
  username: string;
  email: string;
  role: string;
  shop_name?: string | null;
  created_at: Date;
}

class UserModel {
  /**
   * Find a user by their email
   */
  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<User[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Find a user by ID
   */
  async findById(id: number | string): Promise<User | null> {
    const [rows] = await pool.query<User[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Check if a user with the given email or username already exists
   */
  async checkExisting(email: string, username: string, shop_name?: string): Promise<{ email?: User, username?: User, shop_name?: User }> {
    let query = 'SELECT * FROM users WHERE email = ? OR username = ?';
    let params: any[] = [email, username];
    
    if (shop_name) {
      query += ' OR shop_name = ?';
      params.push(shop_name);
    }
    
    const [rows] = await pool.query<User[]>(query, params);
    
    const result: { email?: User, username?: User, shop_name?: User } = {};
    
    rows.forEach(row => {
      if (row.email === email) result.email = row;
      if (row.username === username) result.username = row;
      if (shop_name && row.shop_name === shop_name) result.shop_name = row;
    });
    
    return result;
  }

  /**
   * Get all users with a specific role
   */
  async findByRole(role: string): Promise<User[]> {
    const [rows] = await pool.query<User[]>(
      'SELECT * FROM users WHERE role = ?',
      [role]
    );
    return rows;
  }

  /**
   * Create a new user
   */
  async create(userData: UserInput): Promise<number> {
    const { username, email, password, role, shop_name } = userData;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, role, shop_name) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, role, role === 'seller' ? shop_name : null]
    );
    
    return (result as any).insertId;
  }

  /**
   * Get all users except admins
   */
  async getAllNonAdmin(): Promise<UserOutput[]> {
    const [rows] = await pool.query<User[]>(
      'SELECT id, username, email, role, shop_name, created_at FROM users WHERE role != ?',
      ['admin']
    );
    return rows;
  }

  /**
   * Delete a user by ID
   */
  async delete(id: number | string): Promise<void> {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }

  /**
   * Compare a password with a hashed password
   */
  async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new UserModel(); 