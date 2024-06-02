'use strict';

const db = require("../models");
const Notifications = db.notifications;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const count = await Notifications.count();

    if (count === 0) {
      const notificationsData = [
        {
          title: "Nouveau reservation",
          for: "admin",
          description:
            "Un nouveau reservation a été créé. Nous vous invitons à l'examiner.",
        },
        {
          title: "Reservation validé",
          for: "client",
          description: "Votre Reservation a été validé par administrateur.",
        },
        {
          title: "Rendez-vous",
          for: "admin",
          description: "Vous avez reçu une nouvelle demande de rendez-vous.",
        },
        {
          title: "Rendez-vous",
          for: "client",
          description: "Votre rendez-vous a été confirmé par l'administrateur.",
        },
        {
          title: "Inscription",
          for: "admin",
          description: "Un nouveau client s'est inscrit sur la plateforme.",
        },
        {
          title: "Inscription",
          for: "users",
          description: "Un agent s'est inscrit sur la plateforme.",
        },
      ];

      await Notifications.bulkCreate(notificationsData);
    }
    const newData = {
      title: "Nouveau messages",
      for: "users",
      description: "Vous avez un nouveau messages",
    };

    // Vérifier si cette notification n'existe pas déjà
    const existsNotification = await Notifications.findOne(
      {
        where: {
          title: newData.title,
          for: newData.for,
          description: newData.description,
        },
      }
    );
    // Si la notification n'existe pas, l'ajouter
    if (!existsNotification) {
      await Notifications.bulkCreate([newData]);
    }
  },

  async down(queryInterface, Sequelize) { }
};
