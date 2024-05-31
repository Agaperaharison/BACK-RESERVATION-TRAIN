const db = require("../../models");
const Trips = db.trips;

/**
 * COUNT TRIPS
 * @param {boolean} is_deleted
 */
exports.countTrips = async (is_deleted) => {
    return await Trips.count({
        where: { is_deleted }
    });
}

/**
 * FIND TRIPS ASSOCIATED IN RESERVATION
 * @param {BigInteger} id
 */
exports.findTripsAssociatedInReservation = async (id) => {
    try {
        const trips = await Trips.findOne({
            where: { id }
        });
        return trips;
    } catch (err) {
        throw new Error(err.message);
    }
}