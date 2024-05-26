module.exports = (app, io) => {
    const usersController = require("../../controllers/users.controller");
    var routes = require("express").Router();

    routes.get('/', usersController.index);

    app.use("/api/users", routes);
};
