'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      train_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      to: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departure_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departure_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      is_available: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trips');
  }
};