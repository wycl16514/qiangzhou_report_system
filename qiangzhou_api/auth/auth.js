const User = require('../models/user')
const express = require('express')
const router = express.Router();

const jwt = require('jsonwebtoken')
let refreshTokens = []
router.post('/token', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken === null) {
        res.sendStatus(401)
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
        res.json({ accessToken })
    })
})

router.post('/logout', async (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

router.post('/login', async (req, res) => {
    //auth user
    const phone = req.body.phone
    const user = { name: phone }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ phone, accessToken, refreshToken })
})



module.exports = router;
