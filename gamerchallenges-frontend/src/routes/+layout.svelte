<script>
  import { onMount } from 'svelte';
  import Header from './Header.svelte';
  import '../app.css';
  import 'bootstrap/dist/css/bootstrap.min.css';

  let { children } = $props();
  let user = null;

  // ⭐ FONCTION POUR CHARGER L'USER (RÉUTILISABLE)
  async function loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) {
          user = await userRes.json();
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    } else {
      user = null;
    }
  }

  // ⭐ CHARGE AU DÉMARRAGE
  onMount(loadUser);

  // ⭐ ÉCOUTE LES CHANGEMENTS DE LOCALSTORAGE
  onMount(() => {
    const handleStorageChange = () => {
      loadUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  });
</script>

<div class="app">
  <Header {user} />
  <main>
    {@render children({ user })}
  </main>
  <footer>
    <p>visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit</p>
  </footer>
</div>
<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>