'use strict';

var express = require('express');
var api = express.Router();
var handler = require('./handler');

api.get('/api/notes', handler.getAllNotes);

api.get('/api/notes/:id', handler.getNote);

api.post('/api/notes/add', handler.addNote);

api.put('/api/notes/:id', handler.updateNote);

api.delete('/api/notes/:id', handler.deleteNote);

module.exports = api;