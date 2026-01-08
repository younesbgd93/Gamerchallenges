const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Challenge = sequelize.define('Challenge', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  game: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rules: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Challenge;