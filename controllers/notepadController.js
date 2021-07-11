const router = require('express').Router();
const {Notepad} = require('../models');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => {res.send('notepad test success')});

//NOTEPADS ARE CREATED BY USER REGISTRATION

//UPDATE A USER'S NOTEPAD
router.put('/', validate, (req, res) => {
    Notepad.update({notes: req.body.notes, userId: req.user.id}, {where: {userId: req.user.id}})
    .then(update => res.status(200).json({message: 'notepad updated', update}))
    .catch(err => res.status(500).json({message: 'notepad not updated', err}))
})

module.exports = router;