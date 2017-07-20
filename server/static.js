// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express.Router();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Always return the main index.html on 404 error
app.use(function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

module.exports = app;