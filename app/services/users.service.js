const db = require("../../models");
const Users = db.users;
const { Op } = require('sequelize');

/**
 * COUNT USERS
 * @param {string} role
 * @param {boolean} is_validate
 */
exports.countUsers = async (role, is_validate) => {
    return await Users.count({
        where: { role, is_validate }
    })
}


/**
 * GET LISTS USERS ( role : ADMIN, CLIENT, AGENT )
 * @param {string} role
 */
exports.getListUsers = async (role) => {
    return await Users.findAll({
        where: { role }
    })
}


/**
 * GET INFO AGENT ASSOCIATED IN RESERVATION
 * @param {BigInteger} id
 */
exports.getAgentsById = async (id) => {
    try{
        const agents = await Users.findOne({
            where: { 
                role: 'AGENT', 
                id
            }
        })
        return agents
    }catch(err){
        throw new Error(err.message);
    }
}