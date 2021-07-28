const jwt = require('jsonwebtoken');
const {User} = require('../models');

const validateAdmin = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(403).json({
            auth: false,
            message: 'no token provided'
        })
    } else {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(!err && (decodedToken.isAdmin == true)){
                User.findOne({
                    where: {id: decodedToken.id, isAdmin: true}})
                    .then(user => {
                        if(!user) throw err;

                        //req.user = user;
                        return next();
                    })
                    .catch(err => next(err))

                //decodedToken.isAdmin ? (admin) => {req.isAdmin = admin; return next()} : (err) => next(err);

                
            }else{
                req.errors = err;
                return res.status(500).send('Admin Access Only');
            }
        })
    };
};

module.exports = validateAdmin;