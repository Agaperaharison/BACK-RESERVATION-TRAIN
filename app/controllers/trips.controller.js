const db = require("../../models");
const Trips = db.trips;
const Trains = db.trains;
const Stations = db.stations;
const { successResponse, errorResponse, } = require("../services/response.service");

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Trips controllers')
};