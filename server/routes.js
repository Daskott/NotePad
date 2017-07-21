'use strict';

var express = require('express');
var api = express.Router();
var handler = require('./handler');

// Setup api routes
api.get('/api/notes/:start?/:limit?/:order?', handler.getAllNotes);

api.get('/api/note/:id', handler.getNote);

api.post('/api/note/add', handler.addNote);

api.put('/api/note/:id', handler.updateNote);

api.delete('/api/note/:id', handler.deleteNote);

module.exports = api;