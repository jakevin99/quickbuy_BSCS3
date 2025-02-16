<script>
  import { goto } from '$app/navigation';
  
  let email = "";
  let password = "";
  let errorMessage = "";

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
        return;
      }

      // Clear form and error
      email = "";
      password = "";
      errorMessage = "";

      // Show success message
      alert("Login successful!");
      
      // Redirect to logout page
      goto('/logout');
      
    } catch (error) {
      console.error("Login error:", error);
      errorMessage = "Connection error - please try again";
    }
  }

  function goToRegister() {
    goto('/');
  }
</script>

<main class="flex justify-center items-center h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-96">
    <h1 class="text-center text-2xl font-bold text-green-900 mb-2">logo.</h1>
    <p class="text-center text-gray-500 mb-6 font-sans">Welcome back! Please login to continue.</p>

    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <input
        type="email"
        placeholder="Email"
        bind:value={email}
        class="w-full p-2 border rounded focus:outline-none focus:border-green-500"
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        class="w-full p-2 border rounded focus:outline-none focus:border-green-500"
        required
      />

      {#if errorMessage}
        <p class="text-red-500 text-sm text-center">{errorMessage}</p>
      {/if}

      <button
        type="submit"
        class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
      >
        Login →
      </button>
    </form>

    <p class="text-center mt-4 text-gray-600">
      Don't have an account? 
      <button
        on:click={goToRegister}
        class="text-green-500 hover:text-green-600"
      >
        Register
      </button>
    </p>
  </div>
</main> 