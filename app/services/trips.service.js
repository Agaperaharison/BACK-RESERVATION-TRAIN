const db = require("../../models");
const Trips = db.trips;
const { getTrainAssociedInTrip } = require("../services/train.service")
const { findStationById } = require("./station.service")

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
        const trips = await Trips.findAll({
            where: { id }
        });
        for (const trip of trips) {
            const associatedTrains = await getTrainAssociedInTrip(trip.train_id);
            const from = await findStationById(trip.from);
            const to = await findStationById(trip.to);
            trip.dataValues.trains = associatedTrains;
            trip.dataValues.from = from;
            trip.dataValues.to = to;
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
            order: [["departure_date", "DESC"]],
            limite: 5
        });
        return trips;
    } catch (err) {
        throw new Error(err.message)
    }
}

/**
 * FIND TRIPS
 */
exports.findTrips = async (train_id, from, to, departure_date, departure_time) => {
    try {
        const trips = await Trips.findAll({
            where: { train_id, from, to, departure_date, departure_time }
        });
        return trips;
    } catch (err) {
        throw new Error(err.message)
    }
}


exports.deleteTrip = async (id) => {
    try {
        return await Trips.update(
            { is_deleted: true },
            { where: { id } }
        );
    } catch (err) {
        throw new Error(err.message);
    }
}
