'use strict';

const db = require("../models");
const Stations = db.stations;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const countStation = await Stations.count();

    if (countStation === 0) {
      const stationData = [
        {
          localisation_city: "Fianarantsoa",
          localisation_postal_code: '301',
          latitude: '-21.447810',
          longitude: '47.090222',
          detail:'Gare'
        },
        {
          localisation_city: "Mandroseza",
          localisation_postal_code: '',
          latitude: '-18.937512',
          longitude: '47.553709',
          detail:'Gare'
        },
        {
          localisation_city: "Manakara",
          localisation_postal_code: '',
          latitude: '-22.140218',
          longitude: '48.013297',
          detail:'Gare'
        },
        {
          localisation_city: "Antananarivo",
          localisation_postal_code: '210',
          latitude: '-18.903407',
          longitude: '47.521029',
          detail:'Gare'
        },
        {
          localisation_city: "Antsirabe",
          localisation_postal_code: '',
          latitude: '-19.864803',
          longitude: '47.038433',
          detail:'Gare'
        },
        {
          localisation_city: "Moramanga",
          localisation_postal_code: '',
          latitude: '-18.943897',
          longitude: '48.230432',
          detail:'Gare'
        },
        {
          localisation_city: "Ambatondrazaka",
          localisation_postal_code: '',
          latitude: '-17.820594',
          longitude: '48.422341',
          detail:'Gare'
        },
        {
          localisation_city: "Toamasina",
          localisation_postal_code: '',
          latitude: '-18.155548',
          longitude: '49.409372',
          detail:'Gare'
        },
        {
          localisation_city: "Tampina",
          localisation_postal_code: '',
          latitude: '',
          longitude: '',
          detail:'Gare'
        },
        {
          localisation_city: "Alarobia",
          localisation_postal_code: '',
          latitude: '',
          longitude: '',
          detail:'Gare'
        },
        {
          localisation_city: "Andranokoditra",
          localisation_postal_code: '',
          latitude: '',
          longitude: '',
          detail:'Gare'
        },
        {
          localisation_city: "Anjeva",
          localisation_postal_code: '',
          latitude: '-18.942134',
          longitude: '47.661275',
          detail:'Gare'
        },
        {
          localisation_city: "Ambohidray",
          localisation_postal_code: '',
          latitude: '-18.605675',
          longitude: '48.277262',
          detail:'Gare'
        },
        {
          localisation_city: "Soanerana Antananarivo",
          localisation_postal_code: '210',
          latitude: '-18.940142',
          longitude: '47.522127',
          detail:'Gare'
        },
        {
          localisation_city: "Sahambavy",
          localisation_postal_code: '',
          latitude: '-21.446070',
          longitude: '47.259447',
          detail:'Guichet de gare'
        },
        {
          localisation_city: "Madiorano",
          localisation_postal_code: '',
          latitude: '-21.553398',
          longitude: '47.505988',
          detail:'Guichet de gare'
        },
        {
          localisation_city: "Andrambovato",
          localisation_postal_code: '',
          latitude: '',
          longitude: '',
          detail:'Guichet de gare'
        },
        {
          localisation_city: "Tolongoina",
          localisation_postal_code: '',
          latitude: '-21.558687',
          longitude: '47.513787',
          detail:'Guichet de gare'
        },
        {
          localisation_city: "Ambohidray",
          localisation_postal_code: '',
          latitude: '-18.605685',
          longitude: '48.277279',
          detail:'Guichet de gare'
        },
        {
          localisation_city: "Mahabako",
          localisation_postal_code: '',
          latitude: '',
          longitude: '',
          detail:'Guichet de gare'
        },
      ];
      //await Stations.bulkCreate(stationData);
    }
  },

  async down(queryInterface, Sequelize) {

  }
};
