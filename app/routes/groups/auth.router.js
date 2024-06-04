module.exports = (app, io) => {
    const authController = require("../../controllers/auth.controller");
    var routes = require("express").Router();

    routes.get('/', authController.index);
    routes.post('/sign-up', authController.signUp);
    routes.post('/login', authController.login);
    routes.get('/verify-session-admin', authController.verifySession);
    routes.get('/get-info-admin', authController.infoAdmin);
    routes.get('/session-admin-log-out', authController.logoutSessionAdmin);
    routes.get('/verify-password/:user_id/:password', authController.verifyPassword);
    routes.post('/update-name-user/:id', authController.updateName);
    routes.post('/update-email-user/:id', authController.updateEmail);
    routes.post('/update-address-user/:id', authController.updateAddress);
    routes.post('/update-phone-number-user/:id', authController.updatePhone);
    routes.post('/update-password-user/:id', authController.updatePassword);

    app.use("/project-IHM/reservation-train/api/auth", routes); 
};
