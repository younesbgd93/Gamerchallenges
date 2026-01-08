<script>
  import { onMount } from 'svelte';
  
  let user = null;
  let userChallenges = [];
  let userParticipations = [];

  onMount(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Charge l'utilisateur
      const userRes = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      user = await userRes.json();
      
      // Charge ses défis
      const challengesRes = await fetch('http://localhost:5000/api/challenges');
      const allChallenges = await challengesRes.json();
      userChallenges = allChallenges.filter(c => c.creatorId === user.id);
      
      // Charge ses participations
      const participationsRes = await fetch('http://localhost:5000/api/participations');
      userParticipations = await participationsRes.json();
    }
  });
</script>

{#if user}
  <div class="profile-page">
    <h1>👤 Mon Profil</h1>
    
    <div class="user-info">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Score: {user.score || 0} points</p>
    </div>
    
    <div class="user-stats">
      <div class="stat-card">
        <h3>🎯 Mes Défis</h3>
        <p>{userChallenges.length} créés</p>
      </div>
      
      <div class="stat-card">
        <h3>🏆 Mes Participations</h3>
        <p>{userParticipations.length} soumises</p>
      </div>
    </div>
    
    <!-- Derniers défis créés -->
    <div class="recent-challenges">
      <h3>📝 Mes Derniers Défis</h3>
      {#each userChallenges.slice(0, 3) as challenge}
        <div class="challenge-item">
          <h4>{challenge.title}</h4>
          <p>{challenge.game} - {challenge.difficulty}</p>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>Connecte-toi pour voir ton profil</p>
{/if}

<style>
  .profile-page {
    color: white;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .user-stats {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
  }
  
  .stat-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    flex: 1;
    text-align: center;
  }
  
  .challenge-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 6px;
  }
</style>