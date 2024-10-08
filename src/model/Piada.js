const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Piada = sequelize.define('Piada', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  piada: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  resposta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Piada;
