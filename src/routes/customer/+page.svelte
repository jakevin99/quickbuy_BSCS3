<script>
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth.js';
  
    // Get authenticated user from the store
    $: user = $auth.user;
    
    async function handleLogout() {
      try {
        await auth.logout();
        goto('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
</script>

<main class="px-10 py-6">
    <header class="flex justify-between items-center w-full">
        <h1 class="text-[#21463E] font-extrabold text-3xl">
            Quick<span class="text-[#999999]">Buy</span>
        </h1>
        <button class="bg-[#FDEBEC] text-[#D44C47] px-4 py-2 rounded-lg text-sm w-40 cursor-pointer hover:bg-[#D44C47]/20"
            on:click={handleLogout} >
            Log Out
        </button>
    </header>
    <div class="mt-8">
        {#if user}
            <h2 class="text-2xl font-bold mb-4">Welcome, {user.name || user.email}!</h2>
            <p class="text-gray-600">You are logged in as a customer.</p>
        {:else}
            <p class="text-gray-600">Loading user data...</p>
        {/if}
    </div>
</main>