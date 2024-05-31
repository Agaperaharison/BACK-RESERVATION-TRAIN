'use strict';

const db = require("../models");
const Users = db.users;
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('BSAkashi', 10);
    const _token = await bcrypt.hash('joshueagape@gmail.comBSAkashi', 10);
    const countUser = await Users.count();

    if (countUser === 0) {
      const userData = [
        {
          email: 'joshueagape@gmail.com',
          first_name: 'RAHARISON',
          last_name: 'Joshué Agapé',
          title: 'Mr',
          sexe: 'homme',
          phone_number: '+261 34 35 626 26',
          city: 'Fianarantsoa',
          postal_code:301,
          password: password,
          nationality: 'Malagasy',
          role: 'ADMIN',
          is_validate: true,
          id_default_password: false,
          _token: _token
        }
      ];
      await Users.bulkCreate(userData);
    }
  },

  async down(queryInterface, Sequelize) {
  }
};
