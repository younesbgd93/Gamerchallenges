const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Participation = sequelize.define('Participation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  proof: {
    type: DataTypes.TEXT
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
});

module.exports = Participation;