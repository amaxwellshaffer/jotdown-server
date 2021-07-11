const router = require('express').Router();
const {User, Notepad} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => {
    res.send('testing user controller');
});

// REGISTER A NEW USER
router.post('/register', (req, res) => {
    User.create({ 
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'})
        res.send({user, token})
        //ADD A BLANK NOTEPAD BY DEFAULT
        Notepad.create({notes: req.body.notes, userId: user.id})
        .then(update => res.status(200).json({message: 'notepad updated', update}))
        .catch(err => res.status(500).json({message: 'notepad not updated', err}))
    })
    .catch(error => res.status(500).send({
        message:'user not created',
        error: error.errors[0].message
    }))
});

// LOGIN AN ESTABLISHED USER
router.post('/login', (req, res) => {
    User.findOne({
        where:{
            userName: req.body.userName
        }
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, matches){
                matches ? generateToken(user) : res.send('password is incorrect')
            })

            function generateToken(user){
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
                res.send({message:`welcome, ${user.userName}`, user, token})
            }

        } else {
            res.send('no user found')
        }
    })
})

//GET A USERS ITEMS
router.get('/', validate, (req, res) => {
    User.findAll({ where: {id: req.user.id},
        include: ["checklist", "notepad"]
    }).then(foundUser => res.status(200).json({message: 'user found', foundUser}))
    .catch(err => res.status(500).json({message: 'user not found', error: err}))
})

module.exports = router;