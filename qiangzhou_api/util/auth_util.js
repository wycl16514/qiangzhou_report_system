const jwt = require('jsonwebtoken')

exports.authenticateToken = async (req, res, next) => {
    console.log('call authenticateToken')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        return res.sendStatus(401)
    }

    //find access token from cache by phone

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('auth err: ', err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

