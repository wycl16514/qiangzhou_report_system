const ManageTeam = require('../models/manage_team')
const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../util/auth_util')
router.post('/manageteam', authenticateToken, async (req, res) => {
    const teamData = await ManageTeam.find({})
    console.log("teamData: ", teamData)
    res.json({ teamData })
})

module.exports = router;