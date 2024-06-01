const db = require("../../models");
const Trips = db.trips;
const { getTrainAssociedInTrip } = require("../services/train.service")

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
        for (const trip of trips) {
            const associatedTrains = await getTrainAssociedInTrip(trip.train_id);
            trip.dataValues.train = associatedTrains;
        }
        return trips;
    } catch (err) {
        throw new Error(err.message);
    }
}


/**
 * FIND TRIPS -> SHOW IN DASHBOARD
 */
exports.getTrips = async () => {
    try {
        const trips = await Trips.findAll({
            order: [["departure_date","DESC"]],
            limite: 5
        });
        return trips;
    } catch (err) {
        throw new Error(err.message)
    }
}