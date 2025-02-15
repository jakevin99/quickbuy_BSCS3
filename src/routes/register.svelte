<script>
  let role = "customer";
  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

  function submitForm() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log({ role, username, email, password });
  }
</script>

<main class="flex justify-center items-center h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-96">
    <h1 class="text-center text-2xl font-bold text-green-900">logo.</h1>
    <p class="text-center text-gray-500 mb-4 font-sans">Please, select your role and sign up to continue.</p>

    <div class="flex justify-center mb-4">
      <button 
        class="px-4 py-2 w-1/2 border rounded-l-lg text-xs" 
        class:active={role === 'customer'} 
        on:click={() => role = 'customer'}>
        Customer
      </button>
      <button 
        class="px-2 py-2 w-1/2 border rounded-r-lg text-xs" 
        class:active={role === 'seller'}
        on:click={() => role = 'seller'}>
        Seller
      </button>
    </div>

    <input type="text" placeholder="Username" bind:value={username} class="w-full mb-2 p-2 border rounded" />
    <input type="email" placeholder="Email" bind:value={email} class="w-full mb-2 p-2 border rounded" />
    <input type="password" placeholder="Password" bind:value={password} class="w-full mb-2 p-2 border rounded" />
    <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} class="w-full mb-4 p-2 border rounded" />
    
    <button on:click={submitForm} class="w-full bg-gray-400 text-white py-2 rounded cursor-pointer">Continue →</button>

    <p class="text-center mt-4 text-gray-600">Already have an account? Login</p>
  </div>
</main>

<style>
  button.active {
    background-color: #EFEFEF;
    color: #FFFFFF;
  }
</style>
