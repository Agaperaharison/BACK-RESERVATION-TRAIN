const db = require("../../models");
const Reservations = db.reservations;
const { successResponse, errorResponse, } = require("../services/response.service");
const {
    countReservations_withOption,
    totalAmount, totalPaid, totalUnpaid
} = require("../services/reservation.service")
const { findTripsAssociatedInReservation } = require("../services/trips.service");
const { getUserById } = require("../services/users.service");

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Reservations controllers')
};

/**
 * COUNT THE LISTS RESERVATIONS
 * @param {*} req
 * @param {*} res
 */
exports.reservationsCount = async (req, res) => {
    try {
        const isNotReset = await countReservations_withOption(false);
        const isReset = await countReservations_withOption(true);
        res.send(successResponse({
            total: isNotReset + isReset,
            isNotReset, isReset
        }))
    } catch (err) {
        res.send(errorResponse(err));
    }
}

/**
 * TOTAL SALES
 * @param {*} req
 * @param {*} res
 */
exports.SalesTotal = async (req, res) => {
    try {
        const { date } = req.params;
        const amount = await totalAmount(date);
        const paid = await totalPaid(date);
        const unpaid = await totalUnpaid(date);
        res.send(successResponse({
            amount, paid, unpaid
        }))
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservations.findAll({
            where: { is_reset: false }
        });

        for (const reservation of reservations) {
            const tripsLists = await findTripsAssociatedInReservation(reservation.trip_id);
            reservation.dataValues.trip = tripsLists;
            const client = await getUserById(reservation.client_id);
            reservation.dataValues.client = client;
            const agent = await getUserById(reservation.agent_id);
            reservation.dataValues.agent = agent;
        }
        res.send(successResponse(reservations));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}