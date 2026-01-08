<script>
  import { onMount } from 'svelte';
  
  export let user = null;
  
  onMount(async () => {
    // Vérifie la connexion au chargement
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userRes = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) user = await userRes.json();
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  });
</script>

<nav class="navbar bg-body-tertiary">
  <div class="container-fluid justify-content-start">
    <ul class="navbar-nav flex-row">
      <li class="nav-item me-3">
        <a class="nav-link active" href="/">Accueil</a>
      </li>
      <li class="nav-item me-3">
        <a class="nav-link" href="/challenges">Défis</a>
      </li>
      
      <!-- ⭐ AJOUTE LE CLASSEMENT ICI -->
      <li class="nav-item me-3">
        <a class="nav-link" href="/leaderboard">🏆 Classement</a>
      </li>
      
      <!-- MENU CONDITIONNEL -->
      {#if user}
        <li class="nav-item me-3">
          <a href="/create-challenge" class="nav-link">Créer un défi</a>
        </li>
        <li class="nav-item me-3">
          <a class="nav-link" href="/profile">Mon Profil</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/logout">Déconnexion</a>
        </li>
      {:else}
        <li class="nav-item me-3">
          <a class="nav-link" href="/login">Connexion</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Inscription</a>
        </li>
      {/if}
    </ul>
  </div>
</nav>

<style>
  :global(.navbar-nav) {
    margin-left: 0 !important;
    padding-left: 0 !important;
  }

  :global(.container-fluid) {
    padding-left: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  :global(.navbar) {
    margin-bottom: 20px;
    background-color: transparent !important;
    width: 100%;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  :global(.nav-link) {
    color: white !important;
    font-weight:bold;
  }

  :global(.nav-link:hover) {
    color: white !important;
    font-weight:bold;
  }

  :global(.navbar-nav .nav-item) {
    margin-right: 15px;
    color: white !important;
    font-weight:bold;
  }

  :global(.nav-link.active) {
    font-weight: bold;
    color: white !important;
  }

  :global(body) {
    background-image: url('imagessitejeux.jpeg');
  }
</style>