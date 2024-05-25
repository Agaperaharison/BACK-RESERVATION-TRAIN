'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      localisation_city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      localisation_postal_code: {
        type: Sequelize.STRING,
        allowNull:false
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull:false
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull:false
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull:true
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
    await queryInterface.dropTable('stations');
  }
};