const db = require("../../models");
const Users = db.users;
const Chats = db.chats;
const Chats_content = db.chats_content;
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const { successResponse, errorResponse } = require("../services/response.service");
const { getUserByToken, getUserById } = require('../services/users.service')
const { getMessageByUUID, createChat, createChatContent } = require('../services/chat.service')

exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.session_token;
        const user = await getUserByToken(token);
        const chatsLists = await Chats.findAll({
            where: { received: user.id },
            order: [['createdAt', 'DESC']],
            group: ['uuid_message']
        })
        for (const chat of chatsLists) {
            const userSent = await getUserById(chat.sent);
            const message = await getMessageByUUID(chat.uuid_message);
            chat.dataValues.sent = userSent;
            chat.dataValues.messages = message;
        }
        res.send(successResponse(chatsLists));
    } catch (err) {
        res.send(errorResponse(err.message));
    }
};


exports.sendChat = async (req, res) => {
    try {
        const { message, idRece, idSender, uuid } = req.body;
        const chatContent = { uuid_message: uuid, user_id: idSender, title: 'MESSAGE', content: message, is_read: false, is_deleted: false, is_retired: false };

        const response = await createChatContent(chatContent);
        if (response) {
            res.send(successResponse());
        }
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}