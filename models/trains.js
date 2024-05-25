'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trains extends Model {
    static associate(models) {}
  }
  trains.init({
    design: {
      type:DataTypes.STRING,
      allowNull:false
    },
    train_matricule: {
      type:DataTypes.STRING,
      allowNull:false
    },
    siege: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    color: {
      type:DataTypes.STRING,
      allowNull:true
    },
  }, {
    sequelize,
    modelName: 'trains',
  });
  return trains;
};