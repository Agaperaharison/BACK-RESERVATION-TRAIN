const db = require("../../models");
const Reservations = db.reservations;
const { findTripsAssociatedInReservation } = require("./trips.service");
const { getAgentsById } = require("./users.service");

/**
 * COUNT RESERVATIONS
 * @param {*} is_reset
 */
exports.countReservations_withOption = async (is_reset) => {
    return await Reservations.count({
        where: { is_reset }
    });
}
exports.countReservations = async () => {
    try {
        return await Reservations.count();
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * GET ALL RESERVATIONS BY ID CLIENT
 * @param {*} client_id
 */
exports.getReservationByIdClient = async (client_id) => {
    try {
        const reservations = await Reservations.findAll({
            where: { client_id }
        });

        for (const reservation of reservations) {
            const tripsLists = await findTripsAssociatedInReservation(reservation.trip_id);
            const agents = await getAgentsById(reservation.agent_id);
            reservation.dataValues.trips = tripsLists;
            reservation.dataValues.agents = agents;
        }

        return reservations
    } catch (err) {
        throw new Error(err.message);
    }
};

/**
 * SUM UNPAID CLIENT
 * @param {*} client_id
 */
exports.unpaidForClient = async (client_id) => {
    try {
        const unpaid = await Reservations.sum('unpaid', {
            where: { client_id }
        })
        return unpaid;
    } catch (err) {
        throw new Error(err.message);
    }
};
