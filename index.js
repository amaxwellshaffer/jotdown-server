const express = require("express");
require('dotenv').config();

const userController = require('./controllers/userController');
const checklistController = require('./controllers/checklistController');
const notepadController = require('./controllers/notepadController');
const captainsLogController = require('./controllers/captainsLogController');
const { sequelize } = require("./models");

const app = express();

require("./models/associations");

app.use(require('./middleware/headers'));
app.use(express.json());

app.use('/user', userController);
app.use('/checklist', checklistController);
app.use('/notepad', notepadController);
app.use('/captainslog', captainsLogController);

sequelize.sync();

app.listen(process.env.PORT, () => {console.log('App is listening. App hears all')}); 