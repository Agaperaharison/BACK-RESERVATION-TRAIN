const db = require("../../models");
const Reservations = db.reservations;
const { successResponse, errorResponse, } = require("../services/response.service");
const { countReservations_withOption, countReservations } = require("../services/reservation.service")

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