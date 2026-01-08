const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// ⭐⭐ COMMENTE les routes qui plantent ⭐⭐
 const authRoutes = require('./src/routes/auth');
 const challengeRoutes = require('./src/routes/challenges'); 
 const participationRoutes = require('./src/routes/participations');
const userRoutes = require('./src/routes/users');

// Routes de base
app.get('/api/health', (req, res) => {
  res.json({ message: 'API en marche ! 🎮' });
});

// ⭐⭐ COMMENTE les appels de routes ⭐⭐
 app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/participations', participationRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});