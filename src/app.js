const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('', routes);

app.use((err, req, res, next) => { res.status(500).send('Something broke! Sorry :(') });

module.exports = app;
