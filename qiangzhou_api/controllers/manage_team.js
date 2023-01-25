const User = require('../models/user')
const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../util/auth_util')
router.get('/manageteam', authenticateToken, async (req, res) => {
    res.send('hello world')
})

module.exports = router;