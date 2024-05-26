module.exports = (app, io) => {
    const authController = require("../../controllers/auth.controller");
    var routes = require("express").Router();

    routes.get('/', authController.index);

    app.use("/api/auth", routes);
};
