import { writable } from 'svelte/store';
import type { Category } from '$lib/types/index.js';

/**
 * Categories Store
 * 
 * This module implements a store for categories following RESTful and DRY principles:
 * 
 * RESTful principles:
 * - Provides clear resource-based URLs for category images
 * - Implements standard CRUD methods (GET all, GET by ID)
 * - Maintains stateless interactions with the UI
 * - Has a uniform interface for interacting with category data
 * 
 * DRY principles:
 * - Centralizes category management in a single store
 * - Reuses category definitions across the application
 * - Provides a single source of truth for category data
 * - Standardizes image paths and naming conventions
 */
function createCategoriesStore() {
  const { subscribe, set, update } = writable<{
    categories: Category[];
    loading: boolean;
    error: Error | null;
  }>({
    categories: [],
    loading: false,
    error: null
  });

  return {
    subscribe,
    
    /**
     * Initialize categories
     * 
     * Loads all categories with their images following RESTful URL patterns.
     * Acts like a GET /categories endpoint in a RESTful API.
     */
    initialize: () => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        // Mapping the image files to their respective category names
        const categories: Category[] = [
          { id: 1, name: "Men's Apparel", image: '/images/categories/mens-apparel.jpg' },
          { id: 2, name: "Babies & Kids", image: '/images/categories/babies-kids.jpg' },
          { id: 3, name: "Groceries", image: '/images/categories/groceries.jpg' },
          { id: 4, name: "Home & Living", image: '/images/categories/home-living.jpg' },
          { id: 5, name: "Mobile Accessories", image: '/images/categories/mobile-accessories.jpg' },
          { id: 6, name: "Toys, Game & Collectible", image: '/images/categories/toys-game-collectible.jpg' },
          { id: 7, name: "Women's Bag", image: '/images/categories/womens-bag.jpg' },
          { id: 8, name: "Women's Accessories", image: '/images/categories/womens-accessories.jpg' },
          { id: 9, name: "Mobile & Gadgets", image: '/images/categories/mobile-gadgets.jpg' },
          { id: 10, name: "Home Entertainment", image: '/images/categories/home-entertainment.jpg' },
          { id: 11, name: "Women's Apparel", image: '/images/categories/womens-apparel.jpg' },
          { id: 12, name: "Health & Personal Care", image: '/images/categories/health-personal-care.jpg' },
          { id: 13, name: "Make Up & Fragrance", image: '/images/categories/makeup-fragrance.jpg' },
          { id: 14, name: "Home Appliances", image: '/images/categories/home-appliances.jpg' },
          { id: 15, name: "Laptop & Computer", image: '/images/categories/laptop-computer.jpg' },
          { id: 16, name: "Cameras", image: '/images/categories/cameras.jpg' },
          { id: 17, name: "Gloves & Travel", image: '/images/categories/gloves-travel.jpg' },
          { id: 18, name: "Men's Watches", image: '/images/categories/mens-watches.jpg' },
          { id: 19, name: "Shoes", image: '/images/categories/shoes.jpg' },
          { id: 20, name: "Motors", image: '/images/categories/motors.jpg' }
        ];
        
        update(state => ({ ...state, categories, loading: false }));
        return categories;
      } catch (error) {
        console.error('Error initializing categories:', error);
        update(state => ({ ...state, loading: false, error: error as Error }));
        throw error;
      }
    },
    
    /**
     * Get category by ID
     * 
     * Retrieves a specific category by its ID.
     * Acts like a GET /categories/:id endpoint in a RESTful API.
     */
    getById: (id: number) => {
      let result: Category | undefined;
      subscribe(state => {
        result = state.categories.find(category => category.id === id);
      })();
      return result;
    },
    
    /**
     * Get all categories
     * 
     * Retrieves all categories as an array.
     * Acts like a GET /categories endpoint in a RESTful API.
     */
    getAll: () => {
      let result: Category[] = [];
      subscribe(state => {
        result = state.categories;
      })();
      return result;
    },
    
    /**
     * Reset the store
     * 
     * Resets the store to its initial state.
     */
    reset: () => set({
      categories: [],
      loading: false,
      error: null
    })
  };
}

// Export the store singleton instance
export const categoriesStore = createCategoriesStore(); 