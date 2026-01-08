const express = require('express');
const router = express.Router();

let participations = [
  { 
    id: 1, 
    challengeId: 1,  // ⭐ Challenge 1
    userId: 1, 
    videoUrl: 'https://example.com/video1.mp4',
    proof: 'Ancienne preuve',
    votes: 5,
    status: 'approved'
  }
  // ⭐ Les nouvelles participations seront ajoutées ici
];

// ⭐ ROUTE GET - filtre par challengeId si fourni
router.get('/', (req, res) => {
  const { challengeId } = req.query;
  
  let filteredParticipations = participations;
  
  if (challengeId) {
    filteredParticipations = participations.filter(
      p => p.challengeId === parseInt(challengeId)
    );
    console.log(`📥 Participations pour challenge ${challengeId}:`, filteredParticipations);
  } else {
    console.log('📥 Toutes les participations:', filteredParticipations);
  }
  
  res.json(filteredParticipations);
});

// ⭐ ROUTE POST - garde la même logique
router.post('/', (req, res) => {
  const { challengeId, videoUrl, proof } = req.body;
  
  const newParticipation = {
    id: participations.length + 1,
    challengeId: parseInt(challengeId),
    userId: 2, // Utilisateur différent
    videoUrl: videoUrl,
    proof: proof,
    votes: 0,
    status: 'pending',
    createdAt: new Date()
  };
  
  participations.push(newParticipation);
  
  console.log('✅ Nouvelle participation ajoutée:', newParticipation);
  
  res.json(newParticipation);
});
router.post('/:id/vote', (req, res) => {
  const participationId = parseInt(req.params.id);
  const { action } = req.body; // 'like' ou 'unlike'
  
  console.log(`🗳️ Action: ${action} pour participation: ${participationId}`);
  
  const participation = participations.find(p => p.id === participationId);
  
  if (participation) {
    // Initialise votes si non défini
    if (!participation.votes) participation.votes = 0;
    
    // ⭐ GÈRE LIKE/UNLIKE
    if (action === 'like') {
      participation.votes += 1;
    } else if (action === 'unlike') {
      participation.votes = Math.max(0, participation.votes - 1);
    }
    
    console.log(`✅ ${action} enregistré pour participation ${participationId}, total: ${participation.votes}`);
    
    res.json({ 
      success: true,
      message: `${action} enregistré`,
      participationId: participationId,
      newVoteCount: participation.votes
    });
  } else {
    res.status(404).json({ error: 'Participation non trouvée' });
  }
});
module.exports = router;