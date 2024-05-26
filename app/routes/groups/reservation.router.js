module.exports = (app, io) => {
    const reservationsController = require("../../controllers/reservations.controller");
    var routes = require("express").Router();

    routes.get('/', reservationsController.index);

    app.use("/api/reservations", routes);
};
