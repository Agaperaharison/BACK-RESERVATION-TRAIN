const { successResponse, errorResponse, } = require("../services/response.service");
const { 
    countUsers, 
    getListUsers, 
    verifyUserIfExist,
    addUsers
} = require("../services/users.service")
const { getReservationByIdClient, unpaidForClient } = require("../services/reservation.service")
const bcrypt = require('bcrypt');

/**
 * index
 * @param {*} req
 * @param {*} res
**/
exports.index = async (req, res) => {
    res.send('Users controllers')
};

/**
 * COUNT CUSTOMERS
 * @param {*} req
 * @param {*} res
**/
exports.countUsers = async (req, res) => {
    try {
        const valid_client = await countUsers('CLIENT', true);
        const valid_agent = await countUsers('AGENT', true);
        const invalid_client = await countUsers('CLIENT', false);
        const invalid_agent = await countUsers('AGENT', false);
        res.send(successResponse({
            total: valid_client + invalid_client + valid_agent + invalid_agent,
            total_valid: valid_client + valid_agent,
            total_invalid: invalid_client + invalid_agent
        }))
    } catch (err) {
        res.send(errorResponse(err));
    }
}

/**
 * CUSTOMERS LISTS
 * @param {*} req
 * @param {*} res
**/
exports.allCustomers = async (req, res) => {
    try{
        try {
            const { role } = req.params;
            const clientsLists = await getListUsers(role);
    
            for (const client of clientsLists) {
                const reservationLIste = await getReservationByIdClient(client.id);
                const debs = await unpaidForClient(client.id);
                client.dataValues.reservations = reservationLIste;
                client.dataValues.sumUnpaid = debs ? debs : 0;
                client.dataValues.debs = debs > 0 ? true : false;
            }
    
            res.send(successResponse(clientsLists))
        } catch (err) {
            res.send(errorResponse(err))
        }
    }catch(err){
        res.send(errorResponse(err.message))
    }
}


/**
 * ADD NEW AGENT
 * @param {*} req
 * @param {*} res
**/
exports.addAgent = async (req, res) => {
    try{
        const {
            email, first_name, last_name, sexe, phone_number, date_of_birth, address, city, postal_code, nationality
        } = req.body;
        const password = await bcrypt.hash('agent1234', 8);
        const agent = {
            email, first_name, last_name,title: sexe==="homme"? "Mr" : "Mm", sexe, phone_number, date_of_birth, address, city, postal_code, nationality, password, is_validate:true, role: "AGENT", matricule: `EP-${postal_code}`
        }
        const is_exist = await verifyUserIfExist(email, phone_number);
        if (is_exist){
            res.send(successResponse({ message: "Email or phone number not found!" }))
        }
        await addUsers(agent);
        res.send(successResponse({ message: "Successfully" }))
    }catch(err){
        res.send(errorResponse(err.message))
    }
}