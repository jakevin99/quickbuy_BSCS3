import { writable } from 'svelte/store';
import { api } from '$lib/services/api.js';
import type { Product, ProductFilters, ProductsState } from '$lib/types/index.js';
import type { PaginationMeta } from '$lib/services/api.js';

// Create a type-safe products store
function createProductsStore() {
  const { subscribe, set, update } = writable<ProductsState>({
    products: [],
    loading: false,
    error: null,
    filters: { category: 'all', sort: 'popularity' },
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false
    }
  });

  const store = {
    subscribe,
    
    // Load products with optional filters
    loadProducts: async (filters?: ProductFilters) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        // Only pass filters if category is not 'all'
        const apiFilters = {
          ...filters,
          category: filters?.category === 'all' ? undefined : filters?.category,
          page: filters?.page || store.getState().pagination?.currentPage || 1,
          pageSize: filters?.pageSize || store.getState().pagination?.pageSize || 10
        };
          
        const response = await api.products.getAll(apiFilters);
        const products = response.data as Product[];
        const pagination = response.meta?.pagination as PaginationMeta;
        
        update(state => ({ 
          ...state, 
          products, 
          loading: false,
          filters: { ...state.filters, ...filters },
          pagination: pagination || state.pagination
        }));
        
        return products;
      } catch (error) {
        console.error('Error loading products:', error);
        update(state => ({ ...state, loading: false, error: error as Error }));
        throw error;
      }
    },
    
    // Get a specific product by ID
    getProduct: async (id: string | number) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await api.products.getById(id.toString());
        const product = response.data as Product;
        update(state => ({ ...state, loading: false }));
        return product;
      } catch (error) {
        console.error(`Error loading product ${id}:`, error);
        update(state => ({ ...state, loading: false, error: error as Error }));
        throw error;
      }
    },
    
    // Get current state (for internal use)
    getState: () => {
      let currentState: ProductsState;
      store.subscribe(state => {
        currentState = state;
      })();
      return currentState!;
    },
    
    // Set filters
    setFilters: (filters: ProductFilters) => {
      update(state => ({ 
        ...state, 
        filters: { ...state.filters, ...filters } 
      }));
    },
    
    // Navigate to page
    goToPage: async (page: number) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const currentState = store.getState();
        const filters = {
          ...currentState.filters,
          page
        };
        
        await store.loadProducts(filters);
      } catch (error) {
        console.error(`Error navigating to page ${page}:`, error);
      }
    },
    
    // Reset the store
    reset: () => set({
      products: [],
      loading: false,
      error: null,
      filters: { category: 'all', sort: 'popularity' },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      }
    })
  };
  
  return store;
}

export const productsStore = createProductsStore(); 