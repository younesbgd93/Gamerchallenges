<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // ⭐ SUPPRIME LE TOKEN
    localStorage.removeItem('token');
    
    // ⭐ REDIRIGE VERS L'ACCUEIL
    goto('/');
    
    // ⭐ FORCE LE RECHARGEMENT POUR METTRE À JOUR L'ÉTAT
    setTimeout(() => {
      window.location.reload();
    }, 100);
  });
</script>

<div class="logout-page">
  <h1>👋 Déconnexion...</h1>
  <p>Redirection en cours...</p>
</div>

<style>
  .logout-page {
    color: white;
    text-align: center;
    padding: 4rem;
  }
</style>