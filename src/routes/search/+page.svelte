<script lang="ts">
  import { onMount } from 'svelte';
  import { categoriesStore } from '$lib/stores/categories.js';
  
  /**
   * Search Page Component
   * 
   * This page implements RESTful and DRY principles:
   * 
   * RESTful principles:
   * - Uses centralized category store that models RESTful API endpoints
   * - Follows resource-based organization for category data
   * - Maintains a clean separation between data and presentation
   * - Uses proper HTTP verb semantics (GET for fetching categories)
   * 
   * DRY principles:
   * - Reuses the centralized category store instead of duplicating data
   * - Implements a single template for rendering all categories
   * - Uses reactive binding to automatically update the UI when data changes
   * - Leverages Svelte's reactive declarations for derived state
   */
  
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
  }
  
  interface Collection {
    id: number;
    name: string;
    image: string;
  }
  
  interface Brand {
    name: string;
    logo: string;
  }
  
  let searchQuery = '';
  let loading = false;
  let products: Product[] = [];
  let selectedCategory: number | null = null;
  
  // Get the reactive categories store
  $: ({ categories, loading: categoriesLoading, error: categoriesError } = $categoriesStore);
  
  // Product brands for promotions
  const brands: Brand[] = [
    { name: 'FILA', logo: '/images/brands/fila.png' },
    { name: 'Louis Vuitton', logo: '/images/brands/lv.png' },
    { name: 'Stussy', logo: '/images/brands/stussy.png' },
    { name: 'Nike', logo: '/images/brands/nike.png' },
    { name: 'Seiko', logo: '/images/brands/seiko.png' },
    { name: 'Porcs', logo: '/images/brands/porcs.png' },
    { name: 'Crocs', logo: '/images/brands/crocs.png' },
    { name: 'Mi', logo: '/images/brands/mi.png' },
    { name: 'Cetaphil', logo: '/images/brands/cetaphil.png' }
  ];
  
  // Featured collections
  let featuredCollections: Collection[] = [];
  
  // Initialize categories and featured collections
  onMount(() => {
    // Initialize categories from the store
    categoriesStore.initialize();
    
    // Set featured collections
    featuredCollections = [
      { id: 1, name: "Gadget Haul", image: '/images/collections/gadget-haul.jpg' },
      { id: 2, name: "Everyday Essentials", image: '/images/collections/everyday-essentials.jpg' },
      { id: 3, name: "Branded Deals", image: '/images/collections/branded-deals.jpg' }
    ];
  });
  
  const handleSearch = (): void => {
    if (!searchQuery.trim()) return;
    loading = true;
    
    // Simulate API request
    setTimeout(() => {
      // Mock search results
      products = [
        { id: 1, name: "Nike Air Force 1", price: 90, image: '/images/products/nike-air-force.png', brand: 'Nike' },
        { id: 2, name: "OLAY Total Effects Cream", price: 25, image: '/images/products/olay-cream.jpg', brand: 'OLAY' },
        { id: 3, name: "Wireless Headphones", price: 120, image: '/images/products/headphones.jpg', brand: 'Sony' }
      ];
      loading = false;
    }, 600);
  };
</script>

<svelte:head>
  <title>Search Products | QuickBuy</title>
</svelte:head>

<div class="flex-grow pb-40" style="background: linear-gradient(to bottom, #ffffff 0%, #e0f3ee 30%, #a6d6cc 50%, #52a093 65%, #21463e 90%);">

  <!-- Search Banner -->
  <div class="bg-white py-4 px-6 shadow-sm">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center">
        <div class="w-full flex relative">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Sign up and get 50% off on your first order"
            class="w-full py-2 px-4 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button 
            on:click={handleSearch}
            class="bg-teal-700 text-white py-2 px-4 rounded-r hover:bg-teal-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="ml-4">
         
          <button class="text-gray-600 hover:text-teal-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Promotional Banners -->
  <div class="py-6 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Super Brand Marathons -->
      <div class="bg-teal-800 rounded-lg overflow-hidden relative">
        <div class="p-4 text-white">
          <div class="flex items-center mb-1 text-xs font-medium">
            <span>FEB 1 - MAR 30</span>
            <div class="bg-white text-teal-800 rounded ml-2 px-2 py-0.5 flex items-center">
              <span class="text-2xl mr-1">=</span>Quick<span>Buy</span>
            </div>
          </div>
          <h3 class="text-xl font-bold uppercase mb-2">Super Brand Marathons</h3>
          <div class="flex space-x-2 mb-3">
            <span class="bg-white text-black text-xs px-3 py-1 rounded-full uppercase">Limited Flashsale</span>
            <span class="bg-black text-white text-xs px-3 py-1 rounded-full">30% OFF</span>
          </div>
        </div>
        <div class="bg-white p-3 rounded-lg absolute right-4 bottom-4 grid grid-cols-3 gap-2">
          {#each brands.slice(0, 9) as brand, index}
            <div class="w-8 h-8 flex items-center justify-center">
              <img src={brand.logo || `/images/placeholder.png`} alt={brand.name} class="max-w-full max-h-full" />
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Payday Brands of the Day -->
      <div class="bg-teal-800 rounded-lg overflow-hidden relative">
        <div class="p-4 text-white">
          <div class="flex items-center mb-1 text-xs font-medium">
            <span>FEB 1 - MAR 30</span>
            <div class="bg-white text-teal-800 rounded ml-2 px-2 py-0.5 flex items-center">
              <span class="text-2xl mr-1">=</span>Quick<span>Buy</span>
            </div>
          </div>
          <h3 class="text-xl font-bold uppercase mb-2">Payday Brands of the Day</h3>
        </div>
        <div class="absolute right-4 bottom-4">
          <img src="/images/payday-brand.png" alt="Payday offer" class="h-24" />
        </div>
      </div>
      
      <!-- Promotion code -->
      <div class="bg-teal-800 rounded-lg overflow-hidden relative">
        <div class="p-4 text-white">
          <div class="flex flex-col">
            <span class="text-lg font-bold">GET 300 PESOS OFF</span>
            <div class="bg-yellow-400 text-black font-bold px-3 py-1 rounded mt-2 inline-block">
              USE CODE: CREATEBDAY
            </div>
            <div class="text-xs mt-2">
              <span>FEB 1 - MAR 30</span>
            </div>
          </div>
        </div>
        <div class="absolute right-4 bottom-4">
          <img src="/images/voucher.png" alt="Discount voucher" class="h-24" />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Quick Category Navigation -->
  <div class="max-w-6xl mx-auto px-6 mb-8">
    <div class="bg-white p-4 rounded-lg shadow-sm flex justify-between">
      <div class="text-center px-4">
        <div class="bg-gray-100 p-3 rounded-full mb-2 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span class="text-xs font-medium block">Shop All</span>
      </div>
      
      <div class="text-center px-4">
        <div class="bg-gray-100 p-3 rounded-full mb-2 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-3.6 2.3L2 8" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 21h-4a4 4 0 01-4-4v-2a4 4 0 014-4h4a4 4 0 014 4v2a4 4 0 01-4 4z" />
          </svg>
        </div>
        <span class="text-xs font-medium block">Departments</span>
      </div>
      
      <div class="text-center px-4">
        <div class="bg-gray-100 p-3 rounded-full mb-2 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        </div>
        <span class="text-xs font-medium block">Free Delivery Deals</span>
      </div>
      
      <div class="text-center px-4">
        <div class="bg-gray-100 p-3 rounded-full mb-2 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span class="text-xs font-medium block">Fashion Trends</span>
      </div>
      
      <div class="text-center px-4">
        <div class="bg-gray-100 p-3 rounded-full mb-2 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <span class="text-xs font-medium block">Brands</span>
      </div>
      
      <div class="text-center px-4">
        <div class="bg-gray-100 p-3 rounded-full mb-2 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <span class="text-xs font-medium block">Wishlist</span>
      </div>
    </div>
  </div>
  
  <!-- 3.3 Sale Section -->
  <div class="max-w-6xl mx-auto px-6 mb-12">
    <div class="bg-teal-800 rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-3xl font-bold text-white">3.3 OPENING SALE</h2>
          <div class="flex items-center">
            <span class="text-xs text-white uppercase font-medium">Check out now!</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs text-white">See More</span>
        </div>
      </div>
      
      <div class="text-white mb-2">
        <h3 class="uppercase text-sm font-medium">Featured Collections</h3>
      </div>
      
      <!-- Featured Collections -->
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
        {#each featuredCollections as collection}
          <div class="bg-white rounded-lg overflow-hidden flex flex-col">
            <div class="p-3">
              <img src={collection.image || "/images/placeholder.png"} alt={collection.name} class="w-full h-32 object-cover rounded-lg mb-2" />
              <h4 class="text-xs font-medium text-center text-gray-800">{collection.name}</h4>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Categories Section -->
  <div class="max-w-6xl mx-auto px-6 mb-12">
    <h2 class="text-xl font-bold mb-6">CATEGORIES</h2>
    <div class="bg-white rounded border border-gray-200">
      <div class="grid grid-cols-10">
        {#each categories as category, index}
          <button 
            class="flex flex-col items-center p-2 py-3
                  {index % 10 !== 9 ? 'border-r' : ''} 
                  {Math.floor(index / 10) !== Math.floor((categories.length - 1) / 10) ? 'border-b' : ''} 
                  border-gray-200 hover:bg-gray-50 transition-colors
                  {category.name === 'Women\'s Bag' ? 'category-women-bag' : ''}
                  {category.name === 'Health & Personal Care' ? 'category-health-care' : ''}"
            on:click={() => selectedCategory = category.id}
          >
            <div class="w-24 h-24 rounded-full border border-gray-200 flex items-center justify-center mb-2 overflow-hidden bg-white">
              <img 
                src={category.image} 
                alt={category.name} 
                class="w-24 h-24 object-cover"
              />
            </div>
            <h3 class="text-xs font-medium text-center">{category.name}</h3>
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom styles for category images */
  .category-women-bag img,
  .category-health-care img {
    background-color: white;
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style> 