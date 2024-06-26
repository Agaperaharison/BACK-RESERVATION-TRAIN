const db = require("../../models");
const Users = db.users;
const bcrypt = require('bcrypt');


/**
 * ADD NEW USER
 * @param {Array} user
 */
exports.addUsers = async (user) => {
    try {
        await Users.create(user);
        return true
    } catch (err) {
        throw new Error(err.message)
    }
}

exports.createUsers = async (user) => {
    try {
        return await Users.create(user);
    } catch (err) {
        throw new Error(err.message)
    }
}
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

exports.getUserByMatricule = async (matricule) => {
    try{
        return await Users.findOne({
            where: { matricule }
        })
    }catch(err){
        throw new Error(err.message);
    }
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
    try {
        const agents = await Users.findAll({
            where: {
                role: 'AGENT',
                id
            }
        })
        return agents
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * GET INFO USER ASSOCIATED IN RESERVATION
 * @param {BigInteger} id
 */
exports.getUserById = async (id) => {
    try {
        const agents = await Users.findAll({
            where: { id }
        })
        return agents
    } catch (err) {
        throw new Error(err.message);
    }
}

/**
 * VERIFY UN USER IF IS EXIST
 * @param {string} email
 * @param {string} phone_number
 */
exports.verifyUserIfExist = async (email, phone_number) => {
    try {
        const existByEmail = await Users.findOne({
            where: { email }
        })
        const existByPhoneNumber = await Users.findOne({
            where: { phone_number }
        })
        if (existByEmail || existByPhoneNumber) {
            return true
        }
        return false
    } catch (err) {
        throw new Error(err.message)
    }
}
exports.verifyUserIfExistByEmail = async (email) => {
    try {
        const existByEmail = await Users.findOne({
            where: { email }
        })
        if (existByEmail) {
            return true
        }
        return false
    } catch (err) {
        throw new Error(err.message)
    }
}


/**
 * SERVICE FOR UPDATE USER
 * @param {string} email
 * @param {string} phone_number
 */
exports.updateUser = async (user, id) => {
    try {
        return await Users.update(user, { where: { id } });
    } catch (err) {
        throw new Error(err.message)
    }
}


exports.getUserByToken = async (_token) => {
    try {
        const user = await Users.findOne({
            where: { _token }
        })
        return user
    } catch (err) {
        throw new Error(err.message);
    }
}