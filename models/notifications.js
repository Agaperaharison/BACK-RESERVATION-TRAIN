'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    static associate(models) {}
  }
  notifications.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      for: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
    sequelize,
    modelName: 'notifications',
  });
  return notifications;
};