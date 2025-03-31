<script>
  import { goto } from "$app/navigation";

  let role = "customer";
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";
  let successMessage = "";

  async function submitForm() {
    errorMessage = "";
    successMessage = "";

    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match";
      return;
    }

    const userData = {
      username,
      email,
      password,
      role,
    };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        errorMessage = data.message || "Registration failed!";
        return;
      }

      successMessage = "Registration successful! Redirecting...";

      // Clear fields after success
      username = "";
      email = "";
      password = "";
      confirmPassword = "";

      // Redirect after 2 seconds
      setTimeout(() => {
        goto("/login");
      }, 2000);
    } catch (error) {
      errorMessage = "Connection error - please try again";
    }
  }
</script>

<main class="flex flex-col items-center justify-center h-screen relative">
  {#if errorMessage}
    <p class="text-[#E16F64] bg-[#FFE2DD] text-sm text-center font-medium p-2 w-90 rounded-lg absolute top-6 z-50">
      {errorMessage}
    </p>
  {/if}

  {#if successMessage}
    <p class="text-[#6C9B7D] bg-[#DBEDDB] text-sm text-center font-medium p-2 w-90 rounded-lg absolute top-6 z-50">
      {successMessage}
    </p>
  {/if}

  <!-- logo -->
  <div class="flex flex-col items-center space-y-4 mb-8 mt-12">
    <h1 class="text-[#21463E] font-extrabold text-4xl flex items-center">
      <svg class="hamburger-icon mr-1" width="60" height="27" viewBox="-21 0 47 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="9" y1="1" x2="31" y2="1" stroke="#21463E" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="-1" y1="8" x2="22" y2="8" stroke="#21463E" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="8" y1="15" x2="30" y2="15" stroke="#21463E" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      Quick<span class="text-[#ADADAD]">Buy</span>
    </h1>
    <p class="text-[#686868] text-sm">
      Please, select your role and sign up to continue.
    </p>
  </div>

  <div class="flex justify-between gap-1 p-1 w-90 mb-6 bg-[#EFEFEF] rounded-lg">
    <button class="w-full py-3 text-xs font-medium bg-[#FFFFFF] text-[#21463E] rounded-lg cursor-pointer"
      on:click={() => goto("/register/customer")} >
      Customer
    </button>

    <button class="w-full py-3 text-xs font-medium text-[#686868] rounded-lg cursor-pointer hover:bg-[#686868]/10"
      on:click={() => goto("/register/seller")} >
      Seller
    </button>
  </div>

  <!-- register form -->
  <form class="flex flex-col items-center space-y-3 w-90">
    <!-- username -->
    <div class="user relative w-full">
      <input class="w-full h-12 text-sm font-medium text-[#21463E] pl-10 p-2 border-2 border-[#E2E2E2] rounded-xl focus:outline-none focus:border-[#21463E] input-field"
        required
        type="text"
        placeholder="username"
        bind:value={username} />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round absolute left-3 top-1/2 transform -translate-y-1/2 user-icon">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    </div>

    <!-- email -->
    <div class="mail relative w-full">
      <input class="w-full h-12 text-sm font-medium text-[#21463E] pl-10 p-2 border-2 border-[#E2E2E2] rounded-xl focus:outline-none focus:border-[#21463E] input-field"
        required
        type="email"
        placeholder="email"
        bind:value={email} />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 mail-icon">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    </div>

    <!-- password -->
    <div class="lock relative w-full">
      <input class="w-full h-12 text-sm font-medium text-[#21463E] pl-10 p-2 border-2 border-[#E2E2E2] rounded-xl focus:outline-none focus:border-[#21463E] input-field"
        required
        type="password"
        placeholder="password"
        bind:value={password} />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 lock-icon">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>

    <!-- confirm password -->
    <div class="lock relative w-full">
      <input class="w-full h-12 text-sm font-medium text-[#21463E] pl-10 p-2 border-2 border-[#E2E2E2] rounded-xl focus:outline-none focus:border-[#21463E] input-field"
        required
        type="password"
        placeholder="confirm password"
        bind:value={confirmPassword} />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 lock-icon">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>

    <!-- register button -->
    <button class="bg-[#21463E] w-full h-12 text-white text-sm rounded-2xl mt-1 cursor-pointer"
      on:click={submitForm} >
      <span class="text-[#FFFFFF]">Continue</span>
    </button>
  </form>

  <div class="flex flex-col items-center space-y-8 mb-8">
    <hr class="w-70 border-[#E2E2E2] mt-8" />
    <p class="text-[#686868] text-sm">
      already have an account?
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="text-[#21463E] font-medium cursor-pointer hover:underline"
        on:click={() => goto("/login")} >
        login.
      </span>
    </p>
  </div>
</main>

<style>
  .mail:focus-within .mail-icon {
    stroke: #21463e;
  }

  .lock:focus-within .lock-icon {
    stroke: #21463e;
  }

  .user:focus-within .user-icon {
    stroke: #21463e;
  }

  input:not(:placeholder-shown) + .user-icon,
  input:not(:placeholder-shown) + .mail-icon,
  input:not(:placeholder-shown) + .lock-icon {
    stroke: #21463e;
  }

  .hamburger-icon {
    position: relative;
    font-size: 0.9em;
  }
</style>
