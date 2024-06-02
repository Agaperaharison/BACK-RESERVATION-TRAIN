const db = require('../../models');
const Players = db.players;
const Sequelize = require('sequelize');
const { getNotification } = require("../services/notification.service")

const eventAction = (io) => {
  const userListing = new Set();
  io.on('connection', async (socket) => {

    socket.on('example', (data) => {
      io.emit('callBack', data);
    });

    socket.on('inscription', async (role) => {
      const players = await Players.findAll({
        where: { for: role },
        order: [["createdAt", "DESC"]],
        limite: 3
      });

      for (const player of players) {
        const notification = await getNotification(player.notification_id);
        player.dataValues.notification_info = notification
      }
      io.emit('haveNotif', players);
    })

  });
};

module.exports = eventAction;
