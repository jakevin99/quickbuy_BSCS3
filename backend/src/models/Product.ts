import { RowDataPacket } from 'mysql2/promise';
import pool from './db';
import { ProductFilters } from '../services/productService';

export interface Product extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  stock: number;
  seller_id: number;
  discountPercentage: number;
  rating: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  stock: number;
  seller_id: number;
  discountPercentage?: number;
}

class ProductModel {
  /**
   * Find all products with optional filters
   */
  async findAll(filters?: ProductFilters): Promise<Product[]> {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    
    if (filters) {
      if (filters.category && filters.category !== 'all') {
        query += ' AND category = ?';
        params.push(filters.category);
      }
      
      if (filters.brand) {
        query += ' AND brand = ?';
        params.push(filters.brand);
      }
      
      if (filters.search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        const searchTerm = `%${filters.search}%`;
        params.push(searchTerm, searchTerm);
      }
      
      if (filters.minPrice !== undefined) {
        query += ' AND price >= ?';
        params.push(filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        query += ' AND price <= ?';
        params.push(filters.maxPrice);
      }
      
      // Add sorting
      if (filters.sort) {
        switch (filters.sort) {
          case 'priceLow':
            query += ' ORDER BY price ASC';
            break;
          case 'priceHigh':
            query += ' ORDER BY price DESC';
            break;
          case 'newest':
            query += ' ORDER BY created_at DESC';
            break;
          case 'popularity':
          default:
            query += ' ORDER BY rating DESC';
            break;
        }
      } else {
        // Default sort by popularity (rating)
        query += ' ORDER BY rating DESC';
      }
    }
    
    const [rows] = await pool.query<Product[]>(query, params);
    return rows;
  }
  
  /**
   * Find a product by ID
   */
  async findById(id: number | string): Promise<Product | null> {
    const [rows] = await pool.query<Product[]>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }
  
  /**
   * Create a new product
   */
  async create(productData: ProductInput): Promise<number> {
    const {
      name,
      description,
      price,
      category,
      brand,
      image,
      stock,
      seller_id,
      discountPercentage
    } = productData;
    
    const [result] = await pool.query(
      `INSERT INTO products (
        name, description, price, category, brand, image, 
        stock, seller_id, discountPercentage, rating
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, description, price, category, brand, image,
        stock, seller_id, discountPercentage || 0, 0 // Default rating is 0
      ]
    );
    
    return (result as any).insertId;
  }
  
  /**
   * Update a product
   */
  async update(id: number | string, productData: Partial<ProductInput>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];
    
    // Dynamically build the SET part of the query based on provided fields
    Object.entries(productData).forEach(([key, value]) => {
      if (key !== 'seller_id') { // Don't allow changing the seller
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return; // Nothing to update
    
    const query = `UPDATE products SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`;
    values.push(id);
    
    await pool.query(query, values);
  }
  
  /**
   * Delete a product
   */
  async delete(id: number | string): Promise<void> {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }
  
  /**
   * Get products by seller ID
   */
  async findBySellerId(sellerId: number | string): Promise<Product[]> {
    const [rows] = await pool.query<Product[]>(
      'SELECT * FROM products WHERE seller_id = ?',
      [sellerId]
    );
    return rows;
  }
}

export default new ProductModel(); 