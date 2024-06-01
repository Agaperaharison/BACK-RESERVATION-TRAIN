const db = require("../../models");
const Trips = db.trips;
const { successResponse, errorResponse, } = require("../services/response.service");
const { countTrips, findTrips, deleteTrip } = require("../services/trips.service")
const { allTrains, getTrainAssociedInTrip } = require("../services/train.service")
const { AllStations, findStationById } = require("../services/station.service")

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
        const tripsLists = await Trips.findAll({
            where: { is_deleted: 0 },
            order: [['createdAt', 'DESC']]
        });
        for (const trip of tripsLists) {
            const associatedTrains = await getTrainAssociedInTrip(trip.train_id);
            const from = await findStationById(trip.from);
            const to = await findStationById(trip.to);
            trip.dataValues.train = associatedTrains;
            trip.dataValues.from = from;
            trip.dataValues.to = to;
        }
        res.send(successResponse(tripsLists));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}


/**
 * CREATE A TRIP
 * @param {*} req
 * @param {*} res
 */
exports.createTrips = async (req, res) => {
    try {
        const { train_id, from, to, departure_date, departure_time, price } = req.body;
        const trip = { train_id, from, to, departure_date, departure_time, price };
        const is_exist = await findTrips(train_id, from, to, departure_date, departure_time);
        if (is_exist.length>0) {
            res.send(successResponse({ message: 'This trip already exists.' }));
        } else {
            await Trips.create(trip);
            res.send(successResponse({ message: 'Trip created successfully!' }));
        }
    } catch (err) {
        res.send(errorResponse(err.message));
    }
}

exports.deleteTrip = async (req, res) => {
    try{
        const { id } = req.params;
        const response = await deleteTrip(id);
        if(response){
            res.send(successResponse({ message: 'Trip deleted successfuly!' }))
        }
    }catch(err){
        res.send(errorResponse(err.message));
    }
}