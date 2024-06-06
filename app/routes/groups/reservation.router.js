module.exports = (app, io) => {
    const reservationsController = require("../../controllers/reservations.controller");
    var routes = require("express").Router();

    routes.get('/', reservationsController.index);
    routes.get('/count-reservations', reservationsController.reservationsCount);
    routes.get('/get-sales', reservationsController.SalesTotal);
    routes.get('/get-sales/limite/:limite', reservationsController.SalesTotalLimited);
    routes.get('/get-total-amount', reservationsController.SalesAmount);
    routes.get('/all-reservations', reservationsController.getAllReservations);
    routes.post('/client-add-new-reservation', reservationsController.addClientReservation);
    routes.get('/get-reservations-client', reservationsController.reservationForClient);
    routes.post('/add-reservation', reservationsController.addNewRes);
    routes.post('/update-sale', reservationsController.updateSale);
    routes.get('/get-recette', reservationsController.getRecette);

    app.use("/project-IHM/reservation-train/api/reservations", routes);
};
