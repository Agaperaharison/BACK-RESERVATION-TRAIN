const db = require("../../models");
const { successResponse, errorResponse, } = require("../services/response.service");
const { getTrips } = require("../services/trips.service");
const { getTrainAssociedInTrip } = require("../services/train.service")
const { countSeatUnavailable } = require("../services/reservation.service")
const { findStationById } = require("../services/station.service")

exports.analytics = async (req, res) => {
    try {
        const tripsLists = await getTrips();
        if (tripsLists.length > 0) {
            for (const trip of tripsLists) {
                const associatedTrains = await getTrainAssociedInTrip(trip.train_id);
                const numberSeatUnavailable = await countSeatUnavailable(trip.id);
                const from = await findStationById(trip.from);
                const to = await findStationById(trip.to);
                trip.dataValues.train = associatedTrains;
                trip.dataValues.seatUnavailable = numberSeatUnavailable;
                trip.dataValues.from = from;
                trip.dataValues.to = to;
            }
        }
        res.send(successResponse(tripsLists));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}