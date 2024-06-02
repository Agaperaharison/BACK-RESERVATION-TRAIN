module.exports = (app, io) => {
    const authController = require("../../controllers/auth.controller");
    var routes = require("express").Router();

    routes.get('/', authController.index);
    routes.post('/sign-up', authController.signUp);
    routes.post('/login', authController.login);
    routes.get('/verify-session-admin', authController.verifySession);
    routes.get('/get-info-admin', authController.infoAdmin);
    routes.get('/session-admin-log-out', authController.logoutSessionAdmin);

    app.use("/project-IHM/reservation-train/api/auth", routes); 
};
