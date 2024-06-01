module.exports = (app, io) => {
    const tripsController = require("../../controllers/trips.controller");
    var routes = require("express").Router();

    routes.get('/', tripsController.index);
    routes.get('/get-all-trains', tripsController.allTrains);
    routes.get('/get-all-stations', tripsController.AllStations);
    routes.get('/count-trips', tripsController.tipsCount);
    routes.get('/get-all-trips', tripsController.allTrips);
    routes.post('/add-trip', tripsController.createTrips);
    routes.delete('/delete-trip/:id', tripsController.deleteTrip);

    app.use("/project-IHM/reservation-train/api/trips", routes);
};
