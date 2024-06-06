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
            where: { client_id },
            order: [["id","DESC"]]
        });

        for (const reservation of reservations) {
            const tripsLists = await findTripsAssociatedInReservation(reservation.trip_id);
            reservation.dataValues.trips = tripsLists;
            const agents = await getAgentsById(reservation.agent_id);
            reservation.dataValues.agents = agents;
        }

        return reservations
    } catch (err) {
        throw new Error(err.message);
    }
};

/**
 * GET ALL RESERVATIONS BY ID CLIENT
 * @param {*} client_id
 */
exports.getTach = async (agent_id) => {
    try {
        const reservations = await Reservations.count({
            where: { agent_id }
        });

        return reservations
    } catch (err) {
        throw new Error(err.message);
    }
}

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


/**
 * SUM SEAGE UNAVAILABLE
 * @param {*} trip_id
 */
exports.countSeatUnavailable = async (trip_id) => {
    try {
        const numberOfSeatUnavailable = Reservations.sum('number_of_seats', {
            where: { trip_id, is_reset: false }
        });
        return numberOfSeatUnavailable
    } catch (err) {
        throw new Error(err.message);
    }
}


/**
 * SUM UNPAID AND PAID
 * @param {*} date
 */
exports.totalAmount = async (date) => {
    try {
        const today = date ? date : new Date();
        const todayString = today.toISOString().slice(0, 10);
        const sumPaidAndUnpaid = await Reservations.sum(
            sequelize.literal('paid + unpaid'),
            {
                where: sequelize.where(
                    sequelize.fn('DATE', sequelize.col('createdAt')),
                    todayString
                )
            }
        );
        return sumPaidAndUnpaid;
    } catch (err) {
        throw new Error(err.message)
    }
}

/**
 * SUM PAID
 * @param {*} date
 */
exports.totalPaid = async (date) => {
    try {
        const today = date ? date : new Date();
        const todayString = today.toISOString().slice(0, 10);
        const sumPaid = await Reservations.sum('paid',
            {
                where: sequelize.where(
                    sequelize.fn('DATE', sequelize.col('createdAt')),
                    todayString
                )
            }
        );
        return sumPaid;
    } catch (err) {
        throw new Error(err.message)
    }
}

/**
 * SUM UNPAID
 * @param {*} date
 */
exports.totalUnpaid = async (date) => {
    try {
        const today = date ? date : new Date();
        const todayString = today.toISOString().slice(0, 10);
        const sumUnpaid = await Reservations.sum('unpaid',
            {
                where: sequelize.where(
                    sequelize.fn('DATE', sequelize.col('createdAt')),
                    todayString
                )
            }
        );
        return sumUnpaid;
    } catch (err) {
        throw new Error(err.message)
    }
}


exports.createReservation = async (reservation) => {
    try{
        return await Reservations.create(reservation);
    }catch(err){
        throw new Error(err.message);
    }
}


exports.updateReservation = async (reservation, id) => {
    try{
        return await Reservations.update(reservation, { where: { id }});
    }catch(err){
        throw new Error(err.message)
    }
}


exports.getReservationById = async (id) => {
    try {
        const res = await Reservations.findOne({
            where: { id }
        })
        return res;
    }catch(err){
        throw new Error(err.message)
    }
}