const jwt = require('jsonwebtoken')
const NodeCache = require("global-cache");

exports.authenticateToken = async (req, res, next) => {
    console.log('call authenticateToken')
    const token = req.headers['authorization']
    if (token === null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('auth err: ', err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

