module.exports = (app, io) => {
    const dashboardController = require("../../controllers/dashboard.controller");
    var routes = require("express").Router();

    routes.get("/get-data-in-analytics", dashboardController.analytics);
    routes.get("/get-notification/:role", dashboardController.getNotif);

    app.use("/project-IHM/reservation-train/api/dashboard", routes); 
};
