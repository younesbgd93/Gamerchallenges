<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import VoteButton from '$lib/components/VoteButton.svelte';
  
  let challenge = null;
  let participations = [];

  onMount(async () => {
    const challengeId = $page.params.id;
    
    // Charge le défi
    const challengeRes = await fetch(`http://localhost:5000/api/challenges/${challengeId}`);
    challenge = await challengeRes.json();
    
    // Charge les participations
    const participationsRes = await fetch(`http://localhost:5000/api/participations?challengeId=${challengeId}`);
    participations = await participationsRes.json();
  });
</script>

{#if challenge}
  <div class="challenge-detail">
    <h1>{challenge.title}</h1>
    <p>{challenge.description}</p>
    
    <div class="rules">
      <h3>🎯 Règles :</h3>
      <p>{challenge.rules}</p>
    </div>
    
    <!-- SECTION PARTICIPATIONS -->
    <div class="participations-section">
      <h3>🎮 Participations ({participations.length})</h3>
      
      {#each participations as participation}
        <div class="participation-card">
          <div class="video-info">
            <strong>Participation de User #{participation.userId}</strong>
                {#if participation.proof}
      <p class="description">📝 {participation.proof}</p>
    {/if}
            <p>Vidéo: <a href={participation.videoUrl} target="_blank">Voir la preuve</a></p>
          </div>
          
          <!-- COMPOSANT VOTE ICI -->
          <VoteButton 
            participationId={participation.id} 
            initialVotes={participation.votes} 
          />
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .challenge-detail {
    color: white;
    padding: 2rem;
  }
  
  .participations-section {
    margin-top: 2rem;
  }
  
  .participation-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    display: flex;
    justify-content: between;
    align-items: center;
  }
  
  .video-info {
    flex: 1;
  }
</style>