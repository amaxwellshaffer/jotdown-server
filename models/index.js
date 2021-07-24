const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, "postgres", process.env.DB_PASSWORD, {
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

