<script>
  export let participationId;
  export let initialVotes = 0;
  
  let voteCount = initialVotes;
  let hasVoted = false;
  let isLoading = false;

  async function handleVote() {
    if (isLoading) return;
    
    isLoading = true;
    
    try {
      const token = localStorage.getItem('token');
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // ⭐ ENVOIE L'ACTION (like/unlike)
      const action = hasVoted ? 'unlike' : 'like';
      
      const res = await fetch(`http://localhost:5000/api/participations/${participationId}/vote`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ action: action }) // ⭐ AJOUTE L'ACTION
      });
      
      if (res.ok) {
        const data = await res.json();
        voteCount = data.newVoteCount;
        hasVoted = !hasVoted; // ⭐ INVERSE L'ÉTAT
        console.log(`✅ ${action} enregistré!`);
      }
    } catch (error) {
      console.error('Erreur vote:', error);
    } finally {
      isLoading = false;
    }
  }
</script>

<button 
  on:click={handleVote} 
  disabled={isLoading}
  class="btn vote-btn {hasVoted ? 'voted' : ''}"
>
  {isLoading ? '...' : '👍'} {voteCount}
</button>

<style>
  .vote-btn {
    border: 2px solid #0ff;
    background: transparent;
    color: #0ff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .vote-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 0 15px #0ff;
  }
  
  .vote-btn.voted {
    background: #0ff;
    color: black;
    box-shadow: 0 0 20px #0ff;
  }
  
  .vote-btn:disabled {
    opacity: 0.6;
    cursor: wait;
  }
</style>