const db = require("../../models");
const Users = db.users;
const { successResponse, errorResponse, } = require("../services/response.service");

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Users controllers')
};