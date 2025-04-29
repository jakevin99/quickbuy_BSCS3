<script lang="ts">

  import { goto } from '$app/navigation';

  interface FeaturedProduct {
    name: string;
    image: string;
    price: string;
  }

  // Function to navigate to shop page
  const goToShop = (): void => {
    goto('/shop');
  };

  // Products showcase with images
  const featuredProduct: FeaturedProduct = {
    name: 'Nike Air Force 1',
    image: '/images/nike-air-force.png',
    price: '$90.00'
  };
</script>

<svelte:head>
  <title>QuickBuy - Your Trusted E-Commerce Platform</title>
</svelte:head>

<!-- Main container with gradient background -->
<div class="min-h-screen flex flex-col">
  <!-- Gradient matching reference image exactly -->
  <div class="flex-grow pb-40" style="background: linear-gradient(to bottom, #ffffff 0%, #e0f3ee 30%, #a6d6cc 50%, #52a093 65%, #21463e 90%);">
    <!-- Hero Section -->
    <section class="px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
      <div class="flex flex-col md:flex-row items-start">
        <!-- Left Column: Text Content -->
        <div class="w-full md:w-1/2 text-left mb-16 md:mb-0 pr-0 md:pr-8">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            YOUR <span class="text-black font-extrabold">TRUSTED</span>
          </h1>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            E-<span class="text-black font-extrabold">COMMERCE</span>
          </h1>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
            PLATFORM
          </h1>
          
          <p class="text-gray-800 mb-8 max-w-md text-base">
            Welcome to Quick Buy, your one-stop destination for
            a seamless online shopping experience. We are
            dedicated to bringing you the best products at
            unbeatable prices, all from the comfort of your home.
          </p>
          
          <button on:click={goToShop} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-8 rounded-full border transition duration-300">
            Shop Now
          </button>
        </div>
        
        <!-- Right Column: Images - Separated to prevent overlap -->
        <div class="w-full md:w-1/2 relative">
          <div class="relative flex justify-end items-start h-[380px] max-w-lg">
            <!-- Nike Badge and Image Container - Left Side -->
            <div class="w-[230px] pt-8 pr-2 relative">
              <!-- Nike Air Force 1 Badge - Thinner to match reference -->
              <a href="/shop" class="absolute top-18 right-12 z-30 text-white px-9 py-3 rounded-full flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity" style="width: 210px; background-color: rgb(25, 24, 21);">
                <div class="flex items-center">
                  <span class="text-xs font-medium">Nike Air Force 1</span>
                </div>
                <div class="bg-white rounded-full h-5 w-5 flex items-center justify-center ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              
              <!-- Nike Shoe Box  -->
              <div class="bg-white rounded-lg shadow-md mt-8 w-full h-[270px]">
                <div class="p-4 w-full h-full flex items-center justify-center">
                  <img src="/images/nike-air-force.webp" alt="Nike Air Force 1" class="max-h-full max-w-full object-contain" />
                </div>
              </div>
            </div>
            
            <!-- Person Shopping Image - Right Side -->
            <div class="w-[280px]">
              <div class="rounded-lg overflow-hidden shadow-lg h-full">
                <img src="/images/our_guy.png" alt="Person shopping online" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  <!-- Express Checkout Section in original position with matching color -->
  <section class="px-4 sm:px-6 md:px-12 lg:px-24 -mt-20 relative" style="z-index: 10;">
    <div class="text-white p-14 shadow-lg backdrop-blur-sm relative" style="background-color: #21463e; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); border: 2px solid rgba(255, 255, 255, 0.1); max-width: 320px; width: 100%; border-radius: 20px;">
      <h2 class="text-xl font-bold mb-2">One-Click Express<br>Check out</h2>
      <p class="text-xs mb-1" style="line-height: 1.5;">
        Store your shipping and payment<br>information for easy, one-click ordering<br>in the future
      </p>
    </div>
  </section>
  
  <!-- White bottom section with About Us in right middle position and proper spacing -->
  <div class="bg-white py-1 mt-20 relative" style="min-height: 90px; z-index: 5;">
    <!-- About Section positioned higher -->
    <div class="absolute" style="top: -83%; right: 17%; transform: translateY(-50%); max-width: 450px;">
      <h2 class="text-2xl sm:text-3xl font-bold mb-3">About Us</h2>
      <p class="text-gray-700 mb-4 text-sm sm:text-base">
        Welcome to Quick Buy, your one-stop destination for
        a seamless online shopping experience. We are
        dedicated to bringing you the best products at
        unbeatable prices, all from the comfort of your home.
      </p>
    </div>
  </div>
</div>
<style>
  /* Add any component-specific styles here */
  h1 {
    line-height: 1.1;
  }
</style>
