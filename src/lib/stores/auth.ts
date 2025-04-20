import { writable } from "svelte/store";
import { api } from "$lib/services/api.js";
import type { AuthState, LoginCredentials, LoginResponse, User, RegisterData } from "$lib/types/index.js";
import type { ApiResponse } from "$lib/services/api.js";

// Initialize auth state from localStorage if available
function getInitialState(): AuthState {
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null") as User | null;
    
    if (token && user) {
      return { isAuthenticated: true, token, user };
    }
  }
  
  return { isAuthenticated: false, token: null, user: null };
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(getInitialState());

  return {
    subscribe,
    
    login: async (credentials: LoginCredentials) => {
      try {
        const response = await api.auth.login(credentials) as ApiResponse<LoginResponse>;
        
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Login failed');
        }
        
        // Store token and user data
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        
        // Update store
        set({ isAuthenticated: true, token, user });
        
        return response.data;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    
    logout: async () => {
      try {
        // Call the logout endpoint
        await api.auth.logout();
      } catch (error) {
        console.error("Error during API logout:", error);
      } finally {
        // Always clear local storage and reset store state
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ isAuthenticated: false, token: null, user: null });
      }
    },
    
    register: async (userData: RegisterData) => {
      try {
        const response = await api.auth.register(userData);
        
        if (!response.success) {
          throw new Error(response.message || 'Registration failed');
        }
        
        return response.data;
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    
    initialize: () => {
      const initialState = getInitialState();
      set(initialState);
      return initialState.isAuthenticated;
    },
    
    // Update user data in the store after profile changes
    updateUserData: (userData: Partial<User>) => {
      update(state => ({
        ...state,
        user: state.user ? { ...state.user, ...userData } : null
      }));
      
      // Update in localStorage too
      if (typeof localStorage !== 'undefined') {
        const currentUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
        if (currentUser) {
          localStorage.setItem("user", JSON.stringify({ ...currentUser, ...userData }));
        }
      }
    }
  };
}

export const auth = createAuthStore();
