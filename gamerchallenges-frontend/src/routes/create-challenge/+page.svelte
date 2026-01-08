<script>
  import { goto } from '$app/navigation';
  
  let title = '';
  let description = '';
  let game = '';
  let rules = '';
  let difficulty = 'medium';
  let errorMessage = '';

  async function createChallenge() {
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/challenges', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description, 
          game,
          rules,
          difficulty
        })
      });

      const result = await res.json();
      
      if (res.ok) {
        // ⭐ FORCE LE RECHARGEMENT COMPLET POUR VOIR LE NOUVEAU DÉFI
        window.location.href = '/challenges';
      } else {
        errorMessage = result.error || 'Erreur inconnue';
      }
      
    } catch (error) {
      errorMessage = 'Erreur réseau';
    }
  }
</script>

<!-- Ajoute l'affichage d'erreur -->
{#if errorMessage}
  <div class="alert alert-danger">{errorMessage}</div>
{/if}

<div class="create-challenge">
  <h1>🎯 Créer un Défi</h1>
  
  <form on:submit|preventDefault={createChallenge}>
    <input type="text" bind:value={title} placeholder="Titre du défi" required>
    <textarea bind:value={description} placeholder="Description" required></textarea>
    <input type="text" bind:value={game} placeholder="Jeu" required>
    <textarea bind:value={rules} placeholder="Règles du défi" required></textarea>
    
    <select bind:value={difficulty}>
      <option value="easy">Facile</option>
      <option value="medium">Moyen</option>
      <option value="hard">Difficile</option>
    </select>
    
    <button type="submit">Créer le défi</button>
  </form>
</div>

<style>
  .create-challenge {
    color: white;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  input, textarea, select {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #0ff;
    background: rgba(255,255,255,0.1);
    color: white;
    border-radius: 4px;
  }
  
  button {
    background: #0ff;
    color: black;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
</style>