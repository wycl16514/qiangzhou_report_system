const ManageTeam = require('../models/manage_team')
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
    const hash = req.body.passwordHash
    const teamMembers = await ManageTeam.find({ phone_number: phone })
    if (teamMembers.length === 0) {
        return res.sendStatus(401)
    }
    if (teamMembers[0].hash !== hash) {
        return res.sendStatus(401)
    }

    const teamMember = teamMembers[0]
    const accessToken = jwt.sign({ phone: teamMembers[0].phone_number, name: teamMembers[0].name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
    const refreshToken = jwt.sign({ phone: teamMembers[0].phone_number, name: teamMembers[0].name }, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({ teamMember, accessToken, refreshToken })
})



module.exports = router;
