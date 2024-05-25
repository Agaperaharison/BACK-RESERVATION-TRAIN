'use strict';

const db = require("../models");
const Trains = db.trains;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const countTrain = await Trains.count();

    if (countTrain === 0) {
      const trainData = [
        {
          design: "TRAIN 01",
          train_matricule: 'EO-24/456FD',
          siege: 100,
          color: 'Bleu-rouge-noir'
        },
        {
          design: "TRAIN 02",
          train_matricule: 'FR-001/56XB',
          siege: 75,
          color: 'blanc-noir-vert'
        },
        {
          design: "TRAIN 03",
          train_matricule: 'CA-6789ZX',
          siege: 80,
          color: 'jaune-vert-rouge'
        },
        {
          design: "TRAIN 04",
          train_matricule: '456-Y56FD',
          siege: 130,
          color: 'vert-blanc-rouge'
        }
      ];
      await Trains.bulkCreate(trainData);
    }
  },

  async down (queryInterface, Sequelize) {}
};
