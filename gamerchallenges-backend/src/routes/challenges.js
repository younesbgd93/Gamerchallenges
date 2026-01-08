const express = require('express');
const { body, validationResult } = require('express-validator');
const Challenge = require('../models/Challenge');
const Participation = require('../models/Participation');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
// Remplace la route GET / existante par :
// Remplace la route GET / par :
router.get('/', async (req, res) => {
  try {
    console.log('✅ API Challenges appelée'); // ⭐ DEBUG
    
    // ⭐ ESSAIE SANS LES ASSOCIATIONS D'ABORD
    const challenges = await Challenge.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    console.log('✅ Challenges trouvés:', challenges.length); // ⭐ DEBUG
    res.json(challenges);
    
  } catch (error) {
    console.error('❌ Erreur API challenges:', error); // ⭐ DEBUG
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: error.message 
    });
  }
});
// Route GET /:id simplifiée
router.get('/:id', (req, res) => {
  res.json({
    id: parseInt(req.params.id),
    title: 'Challenge test',
    game: 'Test Game',
    description: 'Description test',
    rules: 'Rules test',
    difficulty: 'medium',
    votes: 10
  });
});



// Create challenge
router.post('/', [
  authMiddleware,
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('game').notEmpty(),
  body('rules').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const challenge = await Challenge.create({
      ...req.body,
      creatorId: req.userId
    });

    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;