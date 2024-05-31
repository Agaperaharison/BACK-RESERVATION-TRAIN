module.exports = (app, io) => {
    const authController = require("../../controllers/auth.controller");
    var routes = require("express").Router();

    routes.get('/', authController.index);
    routes.post('/login', authController.login);

    app.use("/project-IHM/reservation-train/api/auth", routes); 
};
