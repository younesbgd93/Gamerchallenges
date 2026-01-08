const User = require('./User');
const Challenge = require('./Challenge');
const Participation = require('./Participation');

// Associations
User.hasMany(Challenge, { foreignKey: 'creatorId', as: 'challenges' });
Challenge.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

User.hasMany(Participation, { foreignKey: 'userId' });
Participation.belongsTo(User, { foreignKey: 'userId' });

Challenge.hasMany(Participation, { foreignKey: 'challengeId' });
Participation.belongsTo(Challenge, { foreignKey: 'challengeId' });

module.exports = {
  User,
  Challenge,
  Participation
};