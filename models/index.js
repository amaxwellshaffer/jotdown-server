const Sequelize = require('sequelize');

const sequelize = new Sequelize("jotDown", "postgres", "password", {
    dialect: 'postgres', 
    host: 'localhost',
    logging: false,
    // protocol: 'postgres',
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Checklist = require('./checklist')(sequelize, Sequelize);
db.Notepad = require('./notepad')(sequelize, Sequelize);
db.CaptainsLog = require('./captainsLog')(sequelize, Sequelize);

module.exports = db;

