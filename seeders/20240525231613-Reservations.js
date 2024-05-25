'use strict';

const db = require("../models");
const Reservations = db.reservations;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const countReservation = await Reservations.count();
  },

  async down (queryInterface, Sequelize) {
  }
};
