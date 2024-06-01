const db = require("../../models");
const Trains = db.trains;


/**
 * GET ALL TRAINS LISTS
 */
exports.allTrains = async () => {
    try {
        const trainsLists = await Trains.findAll();
        return trainsLists
    } catch (err) {
        throw new Error(err.message);
    }
}


/**
 * FIND TRAIN ASSOCIATED IN TRIPS
 * @param {BigInteger} id
 */
exports.getTrainAssociedInTrip = async (id) => {
    try {
        const trains = await Trains.findAll({
            where: { id }
        });
        
        return trains;
    } catch (err) {
        throw new Error(err.message);
    }
}
