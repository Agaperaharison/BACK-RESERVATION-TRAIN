const db = require("../../models");
const Users = db.users;
const bcrypt = require('bcrypt')
const { successResponse, errorResponse, } = require("../services/response.service");
const { verifyUserIfExistByEmail } = require("../services/users.service")

/**
 * index
 * @param {*} req
 * @param {*} res
 */
exports.index = async (req, res) => {
    res.send('Auth controllers')
};

/**
 * SIGN UP
 * @param {*} req
 * @param {*} res
 */
exports.signUp = async (req, res) => {
    try {
        const { first_name, last_name, email, password, title, sexe } = req.body;
        const pwdHashed = await bcrypt.hash(password, 8);
        const string = `${email}${password}`;
        const _token = await bcrypt.hash(string, 8);
        const role = "CLIENT";
        const user = {
            first_name,
            last_name,
            email,
            password: pwdHashed,
            role,
            _token,
            title,
            sexe
        };
        const verify = await verifyUserIfExistByEmail(email);
        if (verify) {
            res.send(errorResponse({ message: "Email arleady used by a customer!" }));
        };
        await Users.create(user);
        res.send(successResponse({ message: "successfully!" }));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

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
        if (!user) {
            res.send(successResponse({ message: 'Address email does not exist' }));
        }

        const verify = await bcrypt.compare(password, user.password);
        if (verify) {
            res.cookie('session_token', user._token);
            res.send(successResponse(user));
        } else {
            res.send(successResponse({ message: 'Incorrect password' }));
        }
    } catch (err) {
        res.send(errorResponse({ message: err.message }));
    }
}

/**
 * VERIFY IF SESSION ALREADY EXIST
 * @param {*} req
 * @param {*} res
 */
exports.verifySession = async (req, res) => {
    try {
        const token = req.cookies.session_token;
        const user = await Users.findOne({
            where: { _token: token }
        })
        if (user) {
            res.send(successResponse(user));
        } else {
            res.send(errorResponse({ message: `il n'y pas de session en cour...` }));
        }
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

/**
 * RECUPERER TOUT LES INFO DE L'ADMIN CONNECTÉ
 * @param {*} req
 * @param {*} res
 */
exports.infoAdmin = async (req, res) => {
    try {
        const token = req.cookies.session_token;
        const infoAdmin = await Users.findOne({
            where: { _token: token }
        });

        res.send(successResponse(infoAdmin));
    } catch (err) {
        res.send(errorResponse(err.message))
    }
}

/**
 * SUPPRIMER LA SESSIONS
 * @param {*} req
 * @param {*} res
 */
exports.logoutSessionAdmin = async (req, res) => {
    try {
        res.clearCookie('session_token');
        res.json({ status: 200, message: 'Déconnexion réussie !' });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
}