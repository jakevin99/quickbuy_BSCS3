<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  interface FooterLink {
    href: string;
    label: string;
  }
  
  interface FooterLinks {
    company: FooterLink[];
    help: FooterLink[];
    legal: FooterLink[];
  }
  
  // Footer links
  const footerLinks: FooterLinks = {
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/careers', label: 'Careers' },
    ],
    help: [
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping' },
      { href: '/returns', label: 'Returns' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
    ]
  };
</script>

<footer class="bg-gray-800 text-white py-12 px-6 md:px-12">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Brand and description -->
      <div class="mb-8 md:mb-0">
        <div class="text-xl font-bold flex items-center mb-4">
          <div class="mr-4 relative" style="width: 56px; height: 24px;">
            <span class="absolute bg-white" style="width: 15px; height: 2px; top: 6px; left: 56px; border-radius: 1px;"></span>
            <span class="absolute bg-white" style="width: 16px; height: 2px; top: 9.3px; left: 52px; border-radius: 1px;"></span>
            <span class="absolute bg-white" style="width: 15px; height: 2px; top: 12.7px; left: 55px; border-radius: 1px;"></span>
          </div>
          <span>Quick</span><span class="text-gray-300">Buy</span>
        </div>
        <p class="text-gray-300 text-sm">
          Your trusted e-commerce platform for all your shopping needs.
        </p>
      </div>
      
      <!-- Company Links -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Company</h3>
        <ul class="space-y-2">
          {#each footerLinks.company as link}
            <li>
              <a href={link.href} class="text-gray-300 hover:text-white text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Help Links -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Help</h3>
        <ul class="space-y-2">
          {#each footerLinks.help as link}
            <li>
              <a href={link.href} class="text-gray-300 hover:text-white text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <!-- Legal Links -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Legal</h3>
        <ul class="space-y-2">
          {#each footerLinks.legal as link}
            <li>
              <a href={link.href} class="text-gray-300 hover:text-white text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    
    <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300 text-sm">
      <p>&copy; {currentYear} QuickBuy. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  /* Component-specific styles */
</style> 