const db = require("../../models");
const Chats = db.chats;
const Chats_content = db.chats_content;


exports.getMessageByUUID = async (uuid_message) => {
    try {
        return await Chats_content.findAll({
            where: { uuid_message },
            order: [['createdAt', 'ASC']]
        });
    } catch (err) {
        throw new Error(err.message)
    }
}
exports.createChat = async (chat) => {
    try {
        await Chats.create(chat);
        return true
    } catch (err) {
        throw new Error(err.message)
    }
}
exports.createChatContent = async (chatContent) => {
    try {
        await Chats_content.create(chatContent);
        return true
    } catch (err) {
        throw new Error(err.message)
    }
}