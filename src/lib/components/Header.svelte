<script lang="ts">
  import { page } from '$app/stores';
  
  interface NavLink {
    href: string;
    label: string;
  }
  
  // Track active page for highlighting in the navigation
  $: activePage = $page.url.pathname;
  
  // Navigation links
  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' }
  ];
</script>

<header class="bg-white py-4 px-6 md:px-12 flex justify-between items-center border-b" style="border-color: #21463e;">
  <!-- Logo -->
  <a href="/" class="flex items-center">
    <div class="text-xl font-bold flex items-center">
      <div class="mr-4 relative" style="width: 56px; height: 24px;">
        <span class="absolute bg-[#21463e]" style="width: 15px; height: 2px; top: 6px; left: 56px; border-radius: 1px;"></span>
        <span class="absolute bg-[#21463e]" style="width: 16px; height: 2px; top: 9.3px; left: 52px; border-radius: 1px;"></span>
        <span class="absolute bg-[#21463e]" style="width: 15px; height: 2px; top: 12.7px; left: 55px; border-radius: 1px;"></span>
      </div>
      <span class="text-[#21463e]">Quick</span><span class="text-gray-400">Buy</span>
    </div>
  </a>
  
  <!-- Right Section: Navigation + Auth Links -->
  <div class="flex items-center space-x-8">
    <!-- Main Navigation -->
    <nav class="flex space-x-8">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="text-sm font-medium {activePage === link.href ? 'text-teal-700' : 'text-gray-600 hover:text-teal-700'} transition-colors"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Auth Links -->
    <a href="/login" class="text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors">Log In</a>
  </div>
</header>

<style>
  /* Any component-specific styles can go here */
</style> 