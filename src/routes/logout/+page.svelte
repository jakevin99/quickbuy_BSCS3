<script>
  import { goto } from '$app/navigation';

  let showModal = true;
  
  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        showModal = false;
        goto('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  
  function handleCancel() {
    showModal = false;
    goto('/');
  }
</script>

{#if showModal}
<div class="modal-overlay">
  <div class="modal">
    <div class="icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 17L21 12M21 12L16 7M21 12H9M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h2>logout.</h2>
    <p>are you sure you want to leave soon?</p>
    <button class="primary" on:click={handleLogout}>
      Yes, logout <span class="arrow">→</span>
    </button>
    <button class="secondary" on:click={handleCancel}>
      Cancel
    </button>
  </div>
</div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    width: 90%;
    max-width: 380px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  }

  .icon {
    color: #1B4333;
    margin-bottom: 0.25rem;
    height: 24px;
  }

  h2 {
    color: #1B4333;
    font-size: 1.25rem;
    margin: 0;
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    color: #666;
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 0.925rem;
    font-weight: 400;
  }

  .primary {
    background: #1B4333;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-size: 0.925rem;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    transition: background-color 0.2s ease;
  }

  .primary:hover {
    background: #234939;
  }

  .primary .arrow {
    margin-left: 0.5rem;
    font-size: 1.1rem;
  }

  .secondary {
    background: none;
    border: none;
    color: #666;
    font-size: 0.925rem;
    cursor: pointer;
    padding: 0.5rem;
    font-weight: 400;
    transition: color 0.2s ease;
  }

  .secondary:hover {
    color: #1B4333;
  }

  @media (max-width: 640px) {
    .modal {
      width: 85%;
      padding: 2rem;
    }
  }
</style>