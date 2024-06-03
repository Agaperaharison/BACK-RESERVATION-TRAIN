'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notification_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      for: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_read: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};