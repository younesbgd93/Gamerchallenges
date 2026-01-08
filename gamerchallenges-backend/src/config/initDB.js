const sequelize = require('./database');
const { User, Challenge, Participation } = require('../models');

async function initDatabase() {
  try {
    // Synchronise les modèles avec la BDD (crée les tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database synchronized!');
    
    // Crée un utilisateur de test
    const user = await User.create({
      username: 'gamerpro',
      email: 'gamer@test.com',
      password: '123456'
    });
    
    console.log('✅ Test user created!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database init failed:', error);
    process.exit(1);
  }
}

initDatabase();