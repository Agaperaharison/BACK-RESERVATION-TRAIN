const db = require("../../models");
const Users = db.users;
const bcrypt = require('bcrypt')
const { successResponse, errorResponse, } = require("../services/response.service");

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Auth controllers')
};

/**
 * LOGIN
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            where: { email }
        });
        if(!user){
            res.send(successResponse({ message: 'Address email does not exist' }));
        }

        const verify = await bcrypt.compare(password, user.password);
        if(verify){
            res.cookie('session_token', user._token);
            res.send(successResponse(verify))
        }else{
            res.send(successResponse({ message: 'Incorrect password'}));
        }
    } catch (err) {
        res.send(errorResponse(err));
    }
}