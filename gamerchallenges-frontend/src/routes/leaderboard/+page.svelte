<script>
  import { onMount } from 'svelte';
  
  let leaders = [];
  let loading = true;

  onMount(async () => {
    try {
      // Charge les utilisateurs depuis l'API
      const res = await fetch('http://localhost:5000/api/users');
      const users = await res.json();
      
      // Simule un classement basé sur le score
      leaders = users
        .map(user => ({
          id: user.id,
          username: user.username,
          score: user.score || Math.floor(Math.random() * 200), // Score simulé
          challenges: Math.floor(Math.random() * 10) + 1 // Défis simulés
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
        
    } catch (error) {
      console.error('Erreur chargement classement:', error);
      leaders = [];
    } finally {
      loading = false;
    }
  });
</script>

<div class="leaderboard-page">
  <h1>🏆 Classement des Joueurs</h1>
  <p class="subtitle">Top 10 des meilleurs gamers de la communauté</p>
  
  {#if loading}
    <div class="loading">Chargement du classement...</div>
  {:else if leaders.length === 0}
    <div class="no-data">Aucun joueur dans le classement</div>
  {:else}
    <div class="leaders-list">
      {#each leaders as user, index}
        <div class="leader-card {index < 3 ? 'podium' : ''}">
          <div class="rank-section">
            <span class="rank {index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}">
              #{index + 1}
            </span>
          </div>
          
          <div class="user-info">
            <span class="username">{user.username}</span>
            <span class="stats">{user.challenges} défis réalisés</span>
          </div>
          
          <div class="score-section">
            <span class="score">{user.score} pts</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .leaderboard-page {
    color: white;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .subtitle {
    text-align: center;
    color: #0ff;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .leaders-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .leader-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem 1.5rem;
    border-radius: 10px;
    transition: transform 0.2s;
  }
  
  .leader-card:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .leader-card.podium {
    background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,255,255,0.1));
    border: 1px solid #0ff;
  }
  
  .rank-section {
    width: 60px;
  }
  
  .rank {
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0.5rem;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
  }
  
  .rank.gold {
    background: gold;
    color: black;
  }
  
  .rank.silver {
    background: silver;
    color: black;
  }
  
  .rank.bronze {
    background: #cd7f32;
    color: white;
  }
  
  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .username {
    font-size: 1.2rem;
    font-weight: bold;
    color: #0ff;
  }
  
  .stats {
    font-size: 0.9rem;
    color: #ccc;
  }
  
  .score-section {
    text-align: right;
  }
  
  .score {
    font-size: 1.3rem;
    font-weight: bold;
    color: #0ff;
  }
  
  .loading, .no-data {
    text-align: center;
    padding: 3rem;
    color: #0ff;
    font-size: 1.2rem;
  }
</style>