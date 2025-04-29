<script lang="ts">
  import { onMount } from 'svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import { productsStore } from '$lib/stores/products.js';
  
  // Get the reactive products store state
  $: ({ products, loading, filters, error, pagination } = $productsStore);
  $: selectedCategory = filters.category;
  $: sortBy = filters.sort;
  $: currentPage = pagination.currentPage;
  $: totalPages = pagination.totalPages;
  
  // Categories
  let categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'home', name: 'Home & Kitchen' }
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'priceLow', label: 'Price: Low to High' },
    { value: 'priceHigh', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];
  
  // Page size options
  const pageSizeOptions = [
    { value: 10, label: '10 per page' },
    { value: 20, label: '20 per page' },
    { value: 50, label: '50 per page' }
  ];
  
  // Load products on mount
  onMount(async () => {
    try {
      await productsStore.loadProducts();
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  });
  
  // Handle category change
  function handleCategoryChange(categoryId: string) {
    productsStore.setFilters({ category: categoryId, page: 1 }); // Reset to page 1 on category change
    productsStore.loadProducts({ category: categoryId, sort: sortBy, page: 1 });
  }
  
  // Handle sort change
  function handleSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newSortBy = select.value;
    productsStore.setFilters({ sort: newSortBy });
    productsStore.loadProducts({ category: selectedCategory, sort: newSortBy, page: currentPage });
  }
  
  // Handle page size change
  function handlePageSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const newPageSize = parseInt(select.value, 10);
    productsStore.setFilters({ pageSize: newPageSize, page: 1 }); // Reset to page 1 on page size change
    productsStore.loadProducts({ 
      category: selectedCategory, 
      sort: sortBy, 
      pageSize: newPageSize,
      page: 1
    });
  }
  
  // Navigate to page
  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    
    productsStore.setFilters({ page });
    productsStore.loadProducts({
      category: selectedCategory,
      sort: sortBy,
      page
    });
  }
  
  // Create page navigation array
  function getPageNumbers(current: number, total: number): (number | null)[] {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    if (current <= 3) {
      return [1, 2, 3, 4, 5, null, total];
    }
    
    if (current >= total - 2) {
      return [1, null, total - 4, total - 3, total - 2, total - 1, total];
    }
    
    return [1, null, current - 1, current, current + 1, null, total];
  }
  
  $: pageNumbers = getPageNumbers(currentPage, totalPages);
</script>

<svelte:head>
  <title>Shop | QuickBuy</title>
</svelte:head>

<div class="flex-grow pb-40" style="background: linear-gradient(to top, #ffffff 0%, #e0f3ee 30%, #a6d6cc 50%, #52a093 65%, #21463e 90%);">

  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900">Shop Our Products</h1>
      <p class="mt-4 text-gray-500">Discover high-quality products at unbeatable prices</p>
    </div>
    
    <!-- Categories and Filters -->
    <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <!-- Categories -->
      <div class="flex overflow-x-auto pb-2 mb-4 sm:mb-0 -mx-2">
        {#each categories as category}
          <button
            class="mx-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap {selectedCategory === category.id ? 'bg-teal-700 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}"
            on:click={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        {/each}
      </div>
      
      <!-- Sort and Page Size Options -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center">
          <label for="sort" class="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            on:change={handleSortChange}
            class="rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
          >
            {#each sortOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        
        <div class="flex items-center">
          <label for="pageSize" class="text-sm font-medium text-gray-700 mr-2">Show:</label>
          <select
            id="pageSize"
            value={pagination.pageSize}
            on:change={handlePageSizeChange}
            class="rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 text-sm"
          >
            {#each pageSizeOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
    
    <!-- Product Grid -->
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-700"></div>
      </div>
    {:else if error}
      <div class="text-center py-20">
        <p class="text-red-500">Failed to load products. Please try again later.</p>
        <button 
          class="mt-4 bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors"
          on:click={() => productsStore.loadProducts()}
        >
          Retry
        </button>
      </div>
    {:else if products.length === 0}
      <div class="text-center py-20">
        <p class="text-gray-500">No products found in this category.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each products as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
      
      <!-- Pagination Controls -->
      {#if totalPages > 1}
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center">
            <button 
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium 
              {!pagination.hasPreviousPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}"
              disabled={!pagination.hasPreviousPage}
              on:click={() => goToPage(currentPage - 1)}
            >
              <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Previous
            </button>
            
            <div class="mx-2 flex items-center space-x-1">
              {#each pageNumbers as page}
                {#if page === null}
                  <span class="px-3 py-2 text-gray-500">...</span>
                {:else}
                  <button
                    class="px-3 py-2 rounded-md text-sm font-medium {page === currentPage ? 'bg-teal-700 text-white' : 'text-gray-700 hover:bg-gray-200'}"
                    on:click={() => goToPage(page)}
                  >
                    {page}
                  </button>
                {/if}
              {/each}
            </div>
            
            <button 
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium 
              {!pagination.hasNextPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}"
              disabled={!pagination.hasNextPage}
              on:click={() => goToPage(currentPage + 1)}
            >
              Next
              <svg class="h-5 w-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
        
        <div class="mt-2 text-center text-sm text-gray-500">
          Showing {(currentPage - 1) * pagination.pageSize + 1} to {Math.min(currentPage * pagination.pageSize, pagination.totalItems)} of {pagination.totalItems} products
        </div>
      {/if}
    {/if}
  </div>
</div> 

<!--Sidebar-->
<a href="/" class="flex items-center">
  <div class="text-xl font-bold flex items-center">
    <div class="mr-4 relative w-[56px] h-[24px]">
      <span class="absolute bg-[#21463e] w-[15px] h-[2px] top-[6px] left-[55px] rounded-[1px]"></span>
      <span class="absolute bg-[#21463e] w-[15px] h-[2px] top-[9.7px] left-[55px] rounded-[1px]"></span>
      <span class="absolute bg-[#21463e] w-[15px] h-[2px] top-[13.7px] left-[55px] rounded-[1px]"></span>
    </div>
    <span class="text-white">All Categories</span>
  </div>
</a>

