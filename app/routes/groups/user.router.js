module.exports = (app, io) => {
    const usersController = require("../../controllers/users.controller");
    var routes = require("express").Router();

    routes.get('/', usersController.index);
    routes.get('/count-users', usersController.countUsers);
    routes.get('/get-customers-lists/:role', usersController.allCustomers);
    routes.post("/add-new-agent", usersController.addAgent);

    app.use("/project-IHM/reservation-train/api/users", routes);
};
