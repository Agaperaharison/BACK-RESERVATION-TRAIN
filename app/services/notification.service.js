const db = require("../../models");
const Notifications = db.notifications;

exports.getNotification = async (id) => {
    try{
        const notification = await Notifications.findOne({
            where: { id }
        })
        return notification
    }catch(err){
        throw new Error(err.message)
    }
}

