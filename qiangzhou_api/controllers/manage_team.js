const User = require('../models/user')
const express = require('express')
const router = express.Router();

router.get('/manageteam', async (req, res) => {
    res.send('hello world')
})

module.exports = router;