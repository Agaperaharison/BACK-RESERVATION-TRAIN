const db = require("../../models");
const Users = db.users;
const Trips = db.trips;
const Trains = db.trains;
const Stations = db.stations;
const Reservations = db.reservations;
const { successResponse, errorResponse, } = require("../services/response.service");

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Reservations controllers')
};