require('dotenv').config({path: __dirname + '../.env'});
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    const header = req.headers['authorization'];
    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
            if(err){
                res.status(403).json({ err: 'Invalid token' })
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({ err: 'Missing token' })
    }
}
module.exports = {
    verifyToken
}
