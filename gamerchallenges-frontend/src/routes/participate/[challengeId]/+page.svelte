<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';  // ✅ Correct
  
  let videoUrl = '';
  let proof = '';

  async function submitParticipation() {
    const token = localStorage.getItem('token');
    const challengeId = $page.params.challengeId;  // ✅ Maintenant ça fonctionne
    
    const res = await fetch('http://localhost:5000/api/participations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        challengeId,
        videoUrl,
        proof
      })
    });

    if (res.ok) {
      goto(`/challenges/${challengeId}`);
    } else {
      console.error('Erreur lors de la soumission');
    }
  }
</script>

<div class="submit-participation">
  <h1>🎮 Soumettre ma Participation</h1>
  
  <form on:submit|preventDefault={submitParticipation}>
    <input type="url" bind:value={videoUrl} placeholder="URL de la vidéo (YouTube, etc.)" required>
    <textarea bind:value={proof} placeholder="Preuve ou description supplémentaire"></textarea>
    
    <button type="submit">Soumettre ma participation</button>
  </form>
</div>

<style>
  .submit-participation {
    color: white;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  input, textarea {
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