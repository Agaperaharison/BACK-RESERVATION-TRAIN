'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stations extends Model {
    static associate(models) {}
  }
  stations.init({
    localisation_city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    localisation_postal_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type:DataTypes.STRING,
      allowNull:false
    },
    longitude: {
      type:DataTypes.STRING,
      allowNull:false
    },
    detail: {
      type:DataTypes.TEXT,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'stations',
  });
  return stations;
};