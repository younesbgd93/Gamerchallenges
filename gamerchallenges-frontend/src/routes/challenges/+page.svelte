<script>
  import { onMount } from 'svelte';
  import "bootstrap/dist/css/bootstrap.min.css";
  
  export let user = null;
  
  let challenges = [];
  let currentPage = 1;
  let itemsPerPage = 6; 
  let selectedDifficulty = '';
  let selectedGame = '';
  let loading = true;

  onMount(async () => {
    // ⭐ CHARGE L'USER SI BESOIN
    const token = localStorage.getItem('token');
    if (token && !user) {
      const userRes = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (userRes.ok) user = await userRes.json();
    }

    // ⭐ CHARGE LES CHALLENGES
    try {
      const res = await fetch('http://localhost:5000/api/challenges');
      const data = await res.json();
      
      // ⭐ ASSURE-TOU QUE C'EST UN TABLEAU
      challenges = Array.isArray(data) ? data : [data];
      console.log('🎯 Challenges chargés:', challenges);
    } catch (error) {
      console.error('Erreur chargement challenges:', error);
      challenges = [];
    } finally {
      loading = false;
    }
  });
  
  // ⭐ PAGINATION CORRIGÉE
  $: paginatedChallenges = Array.isArray(challenges) ? 
      challenges.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];
  
  $: totalPages = Array.isArray(challenges) ? 
      Math.ceil(challenges.length / itemsPerPage) : 0;

  // ⭐ FILTRES CORRIGÉS
  $: filteredChallenges = Array.isArray(challenges) ? 
      challenges.filter(challenge => {
        return (!selectedDifficulty || challenge.difficulty === selectedDifficulty) &&
               (!selectedGame || challenge.game === selectedGame);
      }) : [];

  // ⭐ DEBUG
  $: console.log('User:', user);
  $: console.log('Challenges count:', challenges.length);
  $: console.log('Filtered count:', filteredChallenges.length);
</script>

<style>
  h1 {
    color: white;
    font-family: 'Arial', sans-serif;
    text-align: center;
    font-weight: bold;
  }
  h2 {
    color: white;
    font-family: 'Arial', sans-serif;   
    font-weight: bold ; 
  }
  :global(body) {
    background-image: url('imagessitejeux.jpeg');
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .card {
    background: rgba(255, 255, 255, 0.9);
  }
  .filters {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  nav {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  :global(.page-link) {
    background: transparent;
    color: #0ff;
    border: 1px solid #0ff;
    border-radius: 6px;
    transition: 0.2s;
    font-weight: bold;
  }
  :global(.page-link:hover) {
    background: #0ff;
    color: black;
    box-shadow: 0 0 10px #0ff;
  }
  :global(.active > .page-link) {
    background: #0ff;
    color: #000;
    box-shadow: 0 0 15px #0ff;
    border-color: #0ff;
  }
  :global(.pagination) {
    gap: 8px;
  }
  :global(.row) {
    margin-left: 0;
    margin-right: 0;
    background: transparent;
  }
  :global(.filters select) {
    background: transparent;
    color: #0ff;
    border: 1px solid #0ff;
    border-radius: 6px;
    padding: 5px;
    margin-right: 10px;
    font-weight: bold;
  }
  :global(main) {
    flex: 1;
  }
  .btn-primary {
    background: #0ff !important;
    color: black !important;
    border: none;
    font-weight: bold;
    padding: 0.75rem 2rem;
  }
  .btn-primary:hover {
    background: #0dd !important;
    box-shadow: 0 0 15px #0ff;
  }
  .btn-success {
  background: #4CAF50 !important;
  color: white !important;
  border: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.btn-success:hover {
  background: #45a049 !important;
  box-shadow: 0 0 10px #4CAF50;
}

/* ⭐ POUR GARDER LA BONNE HAUTEUR DES CARTES */
.d-flex.flex-column {
  height: 100%;
}
</style>

<main>
  <h1>Bienvenue dans ton gamer-challenge</h1>
  <h2>Challenges</h2>
  
  {#if user}
    <div class="text-center mb-4">
      <a href="/create-challenge" class="btn btn-primary btn-lg">
        🎯 Créer un Défi
      </a>
    </div>
  {/if}

  <div class="container">
    <div class="filters">
      <select bind:value={selectedDifficulty}>
        <option value="">Tous les défis</option>
        <option value="easy">Facile</option>
        <option value="medium">Moyen</option>
        <option value="hard">Difficile</option>
      </select>
      <select bind:value={selectedGame}>
        <option value="">Tous les jeux</option>
        <option value="game1">Jeu 1</option>
        <option value="game2">Jeu 2</option>
        <option value="game3">Jeu 3</option>
      </select>
    </div>
  </div>

  {#if loading}
    <p class="text-center text-white">Chargement des défis...</p>
  {:else if filteredChallenges.length === 0}
    <p class="text-center text-white">Aucun défi trouvé</p>
  {:else}
  <div class="row">
  {#each filteredChallenges as challenge}
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{challenge.title}</h5>
          <p class="card-text">{challenge.description}</p>
          <p class="card-text"><strong>Difficulté:</strong> {challenge.difficulty}</p>
          <p class="card-text"><strong>Jeu:</strong> {challenge.game}</p>
          <p class="card-text"><strong>Plateforme:</strong> {challenge.platform}</p>
          
          <!-- ⭐⭐ BOUTON PARTICIPER - AJOUTE ÇA ! ⭐⭐ -->
          <div class="mt-auto">
            <a href="/participate/{challenge.id}" class="btn btn-success w-100">
              🎮 Participer à ce défi
            </a>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
      
  {/if}
</main>

{#if totalPages > 1}
  <nav class="mt-5 mb-5">   
    <ul class="pagination">
      <li class="page-item {currentPage === 1 ? 'disabled' : ''}">
        <button class="page-link" on:click={() => currentPage--}>Previous</button>
      </li>
      
      {#each { length: totalPages } as _, i}
        <li class="page-item {currentPage === i + 1 ? 'active' : ''}">
          <button class="page-link" on:click={() => currentPage = i + 1}>{i + 1}</button>
        </li>
      {/each}
      
      <li class="page-item {currentPage === totalPages ? 'disabled' : ''}">
        <button class="page-link" on:click={() => currentPage++}>Next</button>
      </li>
    </ul>
  </nav>
{/if}