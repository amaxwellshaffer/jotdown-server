const router = require('express').Router();
const {CaptainsLog} = require('../models');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => {res.send("captain's log testing")});

//CREATE A NEW LOG ENTRY
router.post('/new', validate, (req, res) => {
    CaptainsLog.create({
        date: req.body.date,
        entry: req.body.entry,
        userId: req.user.id,
    })
    .then(logEntry => res.status(200).json({logEntry}))
    .catch(err => res.status(500).json({message: 'log entry creation failed', error: err}))
});

//UPDATE A LOG ENTRY
router.put('/update/:id', validate, (req, res) => {
    CaptainsLog.update(req.body, {where: {id: req.params.id, userId: req.user.id} })
    .then(logEntry => res.status(200).json({message: `log entry ${req.params.id} updated.`, logEntry}))
    .catch(err => res.status(500).json({message: 'log entry update failed', error: err}))
});

//GET A LIST OF USER'S LOG ENTRIES
router.get('/', validate, (req, res) => {
    CaptainsLog.findAll({ where: {userId: req.user.id},
        include: ["user"]
    }).then(logEntry => res.status(200).json({message: 'log entries found', logEntry}))
    .catch(err => res.status(500).json({message: 'log entries not found', error: err}))
});

//DELETE LOG ENTRY
router.delete('/delete/:id', validate, (req, res) => {
    CaptainsLog.destroy({where: {id: req.params.id, userId: req.user.id}})
    .then(logEntry => res.status(200).json({message: 'log entry deleted', logEntry}))
    .catch(err => res.status(500).json({message:'log entry not deleted', error: err}))
});



module.exports = router;