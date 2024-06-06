'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chats_content extends Model {
    static associate(models) { }
  }
  chats_content.init({
    uuid_message: {
      type: DataTypes.STRING,
      allowNull:false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull:true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    is_read: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: false
    },
    is_deleted: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: false
    },
    is_retired: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'chats_content',
  });
  return chats_content;
};