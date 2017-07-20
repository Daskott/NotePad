'use strict';
const express = require('express');
const staticRouter = require('./static');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
var apiRouter = require('./routes');
var models = require('../models');

var app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(apiRouter);
app.use(staticRouter);

//sync database modles, then start server
models.sequelize.sync().then(function () {
	app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});