'use strict';

const db = require("../models");
const Trips = db.trips;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const countTrip = await Trips.count();

    if (countTrip === 0) {
      const tripData = [
        {
          train_id: 1,
          from: 1,
          to: 2,
          departure_date: '2024-06-30',
          departure_time: '07:00',
          price: 30000
        },
      ];
      await Trips.bulkCreate(tripData);
    }
  },

  async down (queryInterface, Sequelize) {
  }
};
