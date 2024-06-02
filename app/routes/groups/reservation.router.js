module.exports = (app, io) => {
    const reservationsController = require("../../controllers/reservations.controller");
    var routes = require("express").Router();

    routes.get('/', reservationsController.index);
    routes.get('/count-reservations', reservationsController.reservationsCount);
    routes.get('/get-sales', reservationsController.SalesTotal);
    routes.get('/get-total-amount', reservationsController.SalesAmount);
    routes.get('/all-reservations', reservationsController.getAllReservations);

    app.use("/project-IHM/reservation-train/api/reservations", routes);
};
