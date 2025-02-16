<script lang="ts">
    import '../app.css';
    export let children;
</script>

{#if children}
  {children}
{/if}

<style>
    root {
        --twilight-zone: #191815;
        --shadow-gargoyle: #686868;
        --metal-deluxe: #21463E;
        --million-grey: #999999;
        --salt-blue: #7C9B9C;
        --jupiter: #E2E2E2;
        --morning-green: #87BBAD;
        --crystal-bell: #EFEFEF;
        
        --font-primary: 'Inter', sans-serif;
        --font-secondary: 'DM Sans', sans-serif;
    }

    body {
        font-family: var(--font-primary);
        background-color: var(--crystal-bell);
        color: var(--twilight-zone);
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .container {
        background: var(--jupiter);
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    h1, h2, h3 {
        font-family: var(--font-secondary);
        color: var(--metal-deluxe);
    }

    input[type="text"], input[type="email"], input[type="password"] {
        width: 100%;
        padding: 10px;
        margin: 8px 0;
        border: 1px solid var(--million-grey);
        border-radius: 4px;
        background: var(--crystal-bell);
        font-size: 16px;
    }

    button {
        background: var(--morning-green);
        color: var(--twilight-zone);
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s;
    }

    button:hover {
        background: var(--salt-blue);
    }

    .link {
        color: var(--shadow-gargoyle);
        text-decoration: none;
    }

    .link:hover {
        text-decoration: underline;
    }
</style>
