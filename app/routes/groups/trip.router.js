module.exports = (app, io) => {
    const tripsController = require("../../controllers/trips.controller");
    var routes = require("express").Router();

    routes.get('/', tripsController.index);

    app.use("/api/trips", routes);
};
