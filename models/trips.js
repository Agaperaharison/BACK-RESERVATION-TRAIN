'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trips extends Model {
    static associate(models) { }
  }
  trips.init({
    train_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departure_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    is_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: true
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'trips',
  });
  return trips;
};