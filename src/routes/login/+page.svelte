<script>
  import { goto } from '$app/navigation';

  let email = "";
  let password = "";
  let errorMessage = "";
  let successMessage = "";

  async function handleLogin() {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        errorMessage = data.message || "Login failed";
        successMessage = ""; // Clear success message if error occurs
        return;
      }

      // Clear form and error
      email = "";
      password = "";
      errorMessage = "";

      // Show success message
      successMessage = "Login successful! Redirecting...";
      
      setTimeout(() => {
        successMessage = "";
        goto('/admin');
      }, 1000); // Redirect after 1 seconds

    } catch (error) {
      console.error("Login error:", error);
      errorMessage = "Connection error - please try again";
      successMessage = ""; // Clear success message on error
    }
  }

  function goToRegister() {
    goto('/register/customer');
  }
</script>

<main class="flex flex-col items-center justify-center h-screen relative">
  {#if errorMessage}
    <p class="text-[#E16F64] bg-[#FFE2DD] text-sm text-center font-medium p-2 w-90 rounded-lg absolute top-6">
      {errorMessage}
    </p>
  {/if}

  {#if successMessage}
    <p class="text-[#6C9B7D] bg-[#DBEDDB] text-sm text-center font-medium p-2 w-90 rounded-lg absolute top-6">
      {successMessage}
    </p>
  {/if}
  <!-- logo -->
  <div class="flex flex-col items-center space-y-4 mb-8 mt-12">
    <h1 class="text-[#21463E] font-extrabold text-5xl">Quick<span class="text-[#999999]">Buy</span></h1>
    <p class="text-[#686868] text-sm">Please, log in to access your account.</p>
  </div>

  <!-- login form -->
  <form on:submit|preventDefault={handleLogin} class="flex flex-col items-center space-y-3 w-90">
    <!-- email -->
    <div class="mail relative w-full">
      <input 
        class="w-full h-12 text-sm font-medium text-[#21463E] pl-10 p-2 border-2 border-[#E2E2E2] rounded-xl focus:outline-none focus:border-[#21463E] input-field" 
        required
        type="email" 
        placeholder="your@email.com" 
        bind:value={email} />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 mail-icon">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    </div>

    <!-- password -->
    <div class="lock relative w-full">
      <input 
        class="w-full h-12 text-sm font-medium text-[#21463E] pl-10 p-2 border-2 border-[#E2E2E2] rounded-xl focus:outline-none focus:border-[#21463E] input-field" 
        required
        type="password" 
        placeholder="password" 
        bind:value={password} />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 lock-icon">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    </div>

    <!-- login button -->
    <button class="bg-[#21463E] w-full h-12 text-white text-sm rounded-2xl mt-1 cursor-pointer">
      <span class="text-[#FFFFFF]">Continue</span>
    </button> 
  </form>

  <div class="flex flex-col items-center space-y-8 mb-8">
    <hr class="w-70 border-[#E2E2E2] mt-8"> 
    <p class="text-[#686868] text-sm">don't have an account?
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="text-[#21463E] font-medium cursor-pointer hover:underline"
        on:click={goToRegister} >
        register.
      </span>
    </p>
  </div>
</main>

<style>
  .mail:focus-within .mail-icon {
    stroke: #21463E;
  }

  .lock:focus-within .lock-icon {
    stroke: #21463E;
  }

  input:not(:placeholder-shown) + .mail-icon,
  input:not(:placeholder-shown) + .lock-icon {
    stroke: #21463E;
  }
</style>