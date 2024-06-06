const db = require("../../models");
const Reservations = db.reservations;
const sequelize = require('sequelize');
const { successResponse, errorResponse, } = require("../services/response.service");
const {
    countReservations_withOption,
    createReservation,
    getReservationByIdClient,
    updateReservation, getReservationById
} = require("../services/reservation.service")
const { findTripsAssociatedInReservation, getTripsById } = require("../services/trips.service");
const { getUserById, getUserByToken, createUsers, getUserByMatricule } = require("../services/users.service");

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
exports.SalesTotalLimited = async (req, res) => {
    try {
        const { limite } = req.params;
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
            limite: limite,
            group: [sequelize.literal('DATE(createdAt)')]
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
            group: [sequelize.literal('DATE(createdAt)')],
            limite: 5,
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


exports.addClientReservation = async (req, res) => {
    try {
        const token = req.cookies.session_token;
        const { trip_id, client_id, number_of_seats, unpaid } = req.body;
        const reservation = { trip_id, client_id, number_of_seats, agent_id: 1, paid: 0, unpaid };
        const create = await createReservation(reservation);
        res.send(successResponse(create));
    } catch (err) {
        res.send(errorResponse(err.message));
    }
}

exports.reservationForClient = async (req, res) => {
    try {
        const token = req.cookies.session_token;
        const user = await getUserByToken(token);
        const reservation = await getReservationByIdClient(user.id);
        res.send(successResponse(reservation));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

exports.addNewRes = async (req, res) => {
    try {
        const { trip_id, cin, first_name, last_name, phone_number, address, contry, postal_code, seat, paid } = req.body;
        //const date = Date.now();
        const verifyUser = await getUserByMatricule(cin);
        const trip = await getTripsById(trip_id);
        if (!trip) {
            res.send(errorResponse({ message: `Tre trip does't exist!` }))
        }
        const unpaid = (trip.price * seat) - paid;
        const client = {
            matricule: cin,
            first_name, last_name, phone_number, address, city: contry, postal_code,
            role: 'CLIENT',
        };
        if (!verifyUser) {
            const user = await createUsers(client);
            if (user) {
                const reservation = {
                    trip_id,
                    client_id: user.id,
                    agent_id: 1,
                    number_of_seats: seat,
                    paid, unpaid
                };
                const create = await createReservation(reservation);
                if (create) {
                    res.send(successResponse({ message: `Reservation has created successfully!` }));
                }
            }
        } else {
            const reservation = {
                trip_id,
                client_id: verifyUser.id,
                agent_id: 1,
                number_of_seats: seat,
                paid, unpaid
            };
            const create = await createReservation(reservation);
            if (create) {
                res.send(successResponse({ message: `Reservation has created successfully!` }));
            }
        }
    } catch (err) {
        res.send(errorResponse(err.message));
    }
}

exports.updateSale = async (req, res) => {
    try {
        const { id_res, unpaid, paid_update } = req.body;
        const reserv = await getReservationById(id_res);
        const paid = reserv.paid + paid_update;
        const newUnpaid = unpaid - paid_update;
        const reservation = { unpaid: newUnpaid, paid };
        const update = await updateReservation(reservation, id_res);
        if (update) {
            res.send(successResponse({ message: 'Reservation has updated successfully!' }));
        }
    } catch (err) {
        res.send(errorResponse(err.message));
    }
}

exports.getRecette = async (req, res) => {
    try{
        
    }catch(err){
        res;send(errorResponse(err.message));
    }
}