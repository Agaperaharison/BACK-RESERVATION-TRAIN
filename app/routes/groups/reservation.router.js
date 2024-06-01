module.exports = (app, io) => {
    const reservationsController = require("../../controllers/reservations.controller");
    var routes = require("express").Router();

    routes.get('/', reservationsController.index);
    routes.get('/count-reservations', reservationsController.reservationsCount);
    routes.get('/total-sales/:date', reservationsController.SalesTotal);

    app.use("/project-IHM/reservation-train/api/reservations", routes);
};
