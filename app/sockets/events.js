const db = require('../../models');
const Players = db.players;
const Sequelize = require('sequelize');
const { getNotification } = require("../services/notification.service")
const { getUserById } = require("../services/users.service")
const { createChatContent } = require("../services/chat.service")

const eventAction = (io) => {
  const userListing = new Set();
  io.on('connection', async (socket) => {

    socket.on('example', (data) => {
      io.emit('callBack', data);
    });

    socket.on('inscription', async () => {
      const players = await Players.findAll({
        where: { for: 'ADMIN' },
        order: [["createdAt", "DESC"]],
        limite: 3
      });

      for (const player of players) {
        const notification = await getNotification(player.notification_id);
        const user = await getUserById(player.user_id);
        player.dataValues.notification_info = notification;
        player.dataValues.newUser = user;
      }
      io.emit('haveNotif', players);
    })

    socket.on('create', async (data) => {
      const uuid = data.uuid;
      const idSender = data.idSender;
      const message = data.message;
      const chatContent = { uuid_message: uuid, user_id: idSender, title: 'MESSAGE', content: message, is_read: false, is_deleted: false, is_retired: false };
      await createChatContent(chatContent);
      io.emit('new-message');
    })

  });
};

module.exports = eventAction;
