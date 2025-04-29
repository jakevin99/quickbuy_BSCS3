<script lang="ts">
  import type { Product as SharedProduct } from '$lib/types/index.js';
  
  interface Product extends SharedProduct {}
  
  export let product: Product = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    discountPercentage: 0,
    rating: 0
  };
  
  $: discountedPrice = product.discountPercentage 
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2) 
    : null;
</script>

<div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
  <div class="relative">
    <!-- Product Image -->
    <img 
      src={product.image || '/images/placeholder.png'} 
      alt={product.name}
      class="w-full h-48 object-contain p-4"
    />
    
    <!-- Discount Badge -->
    {#if product.discountPercentage > 0}
      <div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        {product.discountPercentage}% OFF
      </div>
    {/if}
    
    <!-- Quick Action Buttons -->
    <div class="absolute bottom-2 right-2 flex space-x-1">
      <button class="bg-gray-200 hover:bg-gray-300 p-1.5 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <button class="bg-teal-600 hover:bg-teal-700 p-1.5 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  </div>
  
  <div class="p-4">
    <!-- Brand -->
    <div class="text-xs text-gray-500 mb-1">{product.brand}</div>
    
    <!-- Product Name -->
    <h3 class="font-medium text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>
    
    <!-- Price -->
    <div class="flex items-center">
      {#if discountedPrice}
        <span class="text-red-600 font-bold">${discountedPrice}</span>
        <span class="text-gray-500 text-xs line-through ml-2">${product.price.toFixed(2)}</span>
      {:else}
        <span class="font-bold">${product.price.toFixed(2)}</span>
      {/if}
    </div>
    
    <!-- Rating -->
    {#if product.rating}
      <div class="flex items-center mt-2">
        <div class="flex">
          {#each Array(5) as _, i}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 {i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          {/each}
        </div>
        <span class="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
      </div>
    {/if}
  </div>
</div> 