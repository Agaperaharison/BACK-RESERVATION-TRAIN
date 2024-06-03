const db = require("../../models");
const Players = db.players;
const { successResponse, errorResponse, } = require("../services/response.service");
const { getTrips } = require("../services/trips.service");
const { getTrainAssociedInTrip } = require("../services/train.service")
const { countSeatUnavailable } = require("../services/reservation.service")
const { findStationById } = require("../services/station.service")
const { getNotification } = require("../services/notification.service")
const { getUserById } = require("../services/users.service")

exports.analytics = async (req, res) => {
    try {
        const tripsLists = await getTrips();
        if (tripsLists.length > 0) {
            for (const trip of tripsLists) {
                const associatedTrains = await getTrainAssociedInTrip(trip.train_id);
                const numberSeatUnavailable = await countSeatUnavailable(trip.id);
                const from = await findStationById(trip.from);
                const to = await findStationById(trip.to);
                trip.dataValues.train = associatedTrains;
                trip.dataValues.seatUnavailable = numberSeatUnavailable;
                trip.dataValues.from = from;
                trip.dataValues.to = to;
            }
        }
        res.send(successResponse(tripsLists));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

exports.getNotif = async (req, res) => {
    try{
        const { role } = req.params;
        const players = await Players.findAll({
            where: { for: role },
            order: [["createdAt", "DESC"]],
            limite: 3
        });
        for(const player of players){
            const notification = await getNotification(player.notification_id);
            const user = await getUserById(player.user_id);
            player.dataValues.notification_info = notification
            player.dataValues.newUser = user;
        }
        res.send(successResponse(players));
    }catch(err){
        res.send(errorResponse(err.message));
    }
}