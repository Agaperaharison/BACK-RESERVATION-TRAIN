// Contains all route used by app
module.exports = (app , io) => {
    require('./groups/auth.router')(app , io),
    require('./groups/user.router')(app , io),
    require('./groups/trip.router')(app , io),
    require('./groups/reservation.router')(app , io)
};