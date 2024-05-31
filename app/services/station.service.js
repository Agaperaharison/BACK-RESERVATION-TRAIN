const db = require("../../models");
const Stations = db.stations;


/**
 * LISTS STATIONS
 * @param {boolean} is_deleted
 */
exports.AllStations = async () => {
    try {
        const stationsLists = await Stations.findAll();
        return stationsLists
    } catch (err) {
        throw new Error(err.message);
    }
}
