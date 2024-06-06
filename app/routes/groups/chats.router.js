module.exports = (app, io) => {
    const chatController = require("../../controllers/chat.controller");
    var routes = require("express").Router();

    routes.get('/all-contact', chatController.getUser);
    routes.post('/send-message', chatController.sendChat);


    app.use("/project-IHM/reservation-train/api/chats", routes); 
};
