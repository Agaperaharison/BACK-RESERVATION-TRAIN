const db = require("../../models");
const Notifications = db.notifications;
const Players = db.players;

exports.getNotification = async (id) => {
    try {
        const notification = await Notifications.findOne({
            where: { id }
        })
        return notification
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.createNotification = async (user_id, notification_id, forUser) => {
    try {
        const createNotification = await Players.create({
            user_id,
            notification_id,
            for: forUser,
            is_read: false,
            is_deleted: false
        });
        if (!createNotification) {
            throw new Error({ status: false })
        }
        return { status: true }
    } catch (err) {
        throw new Error(err.message)
    }
}

