'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class players extends Model {
    static associate(models) { }
  }
  players.init({
    notification_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    for:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'players',
  });
  return players;
};