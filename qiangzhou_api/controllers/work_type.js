const WorkType = require('../models/work_type')
const express = require('express')
const router = express.Router();
const { authenticateToken } = require('../util/auth_util')
router.post('/addWorkType', async (req, res) => {
    const kind = req.body.kind
    const projects = req.body.projects
    const types = req.body.types
    try {
        const workTypeRecord = await WorkType.find({ kind, })
        if (workTypeRecord.length > 0) {
            return res.status(201)
        }

        const newWorkType = new WorkType({
            kind, projects, types,
        })

        const result = newWorkType.save()
        return res.status(200).send(result)
    } catch (err) {
        res.status(404).send(err)
    }
})

router.get('/getWorkType', async (req, res) => {
    const workTypeRecords = await WorkType.find({})
    res.status(200).send(workTypeRecords)
})



module.exports = router;