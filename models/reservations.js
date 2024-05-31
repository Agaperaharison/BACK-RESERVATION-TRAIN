'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservations extends Model {
    static associate(models) { }
  }
  reservations.init({
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    agent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paid: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    unpaid: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    is_reset: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'reservations',
  });
  return reservations;
};