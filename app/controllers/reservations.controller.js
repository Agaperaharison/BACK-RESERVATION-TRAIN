const db = require("../../models");
const Reservations = db.reservations;
const sequelize = require('sequelize');
const { successResponse, errorResponse, } = require("../services/response.service");
const {
    countReservations_withOption
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
        const sales = await Reservations.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('paid + unpaid')), 'totalAmount'],
                [sequelize.fn('SUM', sequelize.col('paid')), 'paidAmount'],
                [sequelize.fn('SUM', sequelize.col('unpaid')), 'unpaidAmount'],
                'createdAt'
            ],
            where: {
                is_reset: 0
            },
            group: ['createdAt']
        })
        res.send(successResponse(sales))
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}
exports.SalesAmount = async (req, res) => {
    try {
        const sales = await Reservations.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('paid + unpaid')), 'totalAmount'],
                'createdAt'
            ],
            where: {
                is_reset: 0
            },
            group: ['createdAt'],
            order: [['createdAt', 'ASC']]
        })
        res.send(successResponse(sales))
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservations.findAll({
            where: { is_reset: false },
            order: [["id", "DESC"]]
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