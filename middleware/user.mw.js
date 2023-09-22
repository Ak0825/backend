const jwt = require('jsonwebtoken');
const config = require('../config/db');

module.exports = { 
    getAdminByOAuthToken
};

async function getAdminByOAuthToken(req, res, next) {
    let authTemp = req.headers.authorization;
    if (authTemp == null || authTemp == undefined) {
        return res.status(401).json({ error: { message: 'authentication failed.' } });
    }
    let token = authTemp.replace('Bearer ', '');
    console.log(token)

    if (token == null || token == undefined || token == '') {
        res.auth_failed = {
            message: 'token not found.'
        };
        return;
    }

    let decodedToken = jwt.decode(token, { complete: true });
    console.log(decodedToken)
    if (decodedToken && decodedToken.payload.email) {
        try {
            console.log("1")
            let verifiedToken = await jwt.verify(token, config.jwt.secretKey);
            console.log(verifiedToken , "verifiedToken")
            if (!verifiedToken) {
                return res.status(401).json({ error: { message: 'token expired.' } });
            }
            req.loggedInUserObj = { userId: decodedToken.payload.userId, email: decodedToken.payload.email, type: decodedToken.payload.type }
            console.log(req.loggedInUserObj, 'objj')
        } catch (e) {
            return res.status(401).json({ error: e , message :"s" });
        }
    } else {
        return res.status(401).json({ error: { message: 'token decode unsuccessful.' } });
    }
    next();
}