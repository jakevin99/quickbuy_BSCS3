import { writable } from 'svelte/store';
import { api } from '$lib/services/api.js';
import type { User } from '$lib/types/index.js';

// Create a type-safe users store
function createUsersStore() {
    const { subscribe, set, update } = writable<User[]>([]);

    return {
        subscribe,
        
        // Load all users from the API
        loadUsers: async () => {
            try {
                const response = await api.admin.getUsers() as User[];
                set(response);
                return response;
            } catch (error) {
                console.error('Error loading users:', error);
                throw error;
            }
        },

        // Delete a user and update the store
        deleteUser: async (userId: string) => {
            try {
                // Call API to delete the user
                await api.admin.deleteUser(userId);
                
                // Update local store to reflect the deletion
                update(users => users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        },
        
        // Reset the store to empty
        reset: () => set([])
    };
}

export const UsersStore = createUsersStore();
