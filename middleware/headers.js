const headers = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');         //allows users from any origin
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');  //limits what methods can be used on the server
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    return next();
};

module.exports = headers;