'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trip_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      agent_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number_of_seats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paid: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      unpaid: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      is_reset: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('reservations');
  }
};