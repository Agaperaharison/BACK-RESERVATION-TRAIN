'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    static associate(models) { }
  }
  chats.init({
    uuid_message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sent: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    received: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'chats',
  });
  return chats;
};