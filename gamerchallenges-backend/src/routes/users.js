const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, username: 'Gamer1', score: 100, avatar: 'default-avatar.png' },
    { id: 2, username: 'ProGamer', score: 250, avatar: 'default-avatar.png' },
    { id: 3, username: 'ChallengeMaster', score: 180, avatar: 'default-avatar.png' }
  ]);
});


router.get('/:id', (req, res) => {
  res.json({
    id: parseInt(req.params.id),
    username: 'TestUser',
    email: 'test@example.com',
    score: 150,
    avatar: 'default-avatar.png',
    joinedAt: '2024-01-01'
  });
});

// Leaderboard
router.get('/leaderboard/top', (req, res) => {
  res.json([
    { id: 2, username: 'ProGamer', score: 250, rank: 1 },
    { id: 3, username: 'ChallengeMaster', score: 180, rank: 2 },
    { id: 1, username: 'Gamer1', score: 100, rank: 3 }
  ]);
});

module.exports = router;