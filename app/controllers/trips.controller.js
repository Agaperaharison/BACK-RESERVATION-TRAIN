const db = require("../../models");
const Trips = db.trips;
const { successResponse, errorResponse, } = require("../services/response.service");
const { countTrips } = require("../services/trips.service")
const { allTrains, getTrainAssociedInTrip } = require("../services/train.service")
const { AllStations } = require("../services/station.service")

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Trips controllers')
};

/**
 * GET ALL TRAINS
 * @param {*} req
 * @param {*} res
 */
exports.allTrains = async (req, res) => {
    try {
        const trainsLists = await allTrains();
        res.send(successResponse(trainsLists))
    } catch (err) {
        res.send(errorResponse(err));
    }
}

/**
 * GET ALL STATIONS
 * @param {*} req
 * @param {*} res
 */
exports.AllStations = async (req, res) => {
    try {
        const stationsLists = await AllStations();
        res.send(successResponse(stationsLists))
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

/**
 * TRIPS COUNT
 * @param {*} req
 * @param {*} res
 */
exports.tipsCount = async (req, res) => {
    try {
        const tripsNotDeleted = await countTrips(false);
        const tripsDeleted = await countTrips(true);
        res.send(successResponse({
            total: tripsNotDeleted + tripsDeleted,
            tripsNotDeleted,
            tripsDeleted,
        }))
    } catch (err) {
        res.send(errorResponse(err));
    }
}

/**
 * GET ALL TRIPS
 * @param {*} req
 * @param {*} res
 */
exports.allTrips = async (req, res) => {
    try {
        const tripsLists = await Trips.findAll();
        for (const trip of tripsLists) {
            const associatedTrains = await getTrainAssociedInTrip(trip.train_id);
            trip.dataValues.train = associatedTrains;
        }
        res.send(successResponse(tripsLists));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}
