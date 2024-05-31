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
 * @param {BigInteger} train_id
 */
exports.getTrainAssociedInTrip = async (train_id) => {
    try {
        const train = await Trains.findOne({
            where: { id: train_id }
        });
        if (!train) {
            throw new Error("Train not found");
        }
        return train;
    } catch (err) {
        throw new Error(err.message);
    }
}
