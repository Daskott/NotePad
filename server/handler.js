var models = require('../models');
var Note = models.Note;

/**
 * Handlers for for our api routes
 */
var handler = {
    getAllNotes: (request, response) => {

        // get query string if any
        const queryString = require('query-string');
        var paramsArray = request.url.split('?');
        var params = "?";
        if(paramsArray.length >= 2){
            for(var i = 1; i < paramsArray.length; i++){
                params+=paramsArray[i];
            }
        }
        
        const query = queryString.parse(params);
        var order = request.params.order || query.order || "DESC";
        var limit = parseInt(request.params.limit) || parseInt(query.limit) || null;
        var start = parseInt(request.params.start) || parseInt(query.start) || 0;

        
        // validate order
        if(order && !(order.toString().toUpperCase() === "DESC" || order.toString().toUpperCase() === "ASC") )
            order = "DESC";

        // validate limit
        if(limit && !Number.isInteger(limit)) limit = null;

        // validate start
        if(start && !Number.isInteger(start)) start = 0;

        Note.findAll({order: [['id', order]], offset: start, limit: limit})
        .then(notes => {
            return response.status(200).json({success:true, data:notes});
        })
        .catch(error=> {
            return response.status(400).json({success:false, message:error.message});
        });
    },

    getNote: (request, response) => {
        var noteId = request.params.id;

        Note.findOne({ where: {id: noteId}})
        .then(function(note) {
            if(!note)return response.status(200).send({success:false, message:"Sorry, record does not exist!"});	
            return response.status(200).send({success:true, data:note});	
        })
        .catch(function(error){
            return response.status(400).send({success:false, message:error.message});
        });
    },

    addNote: (request, response) => {
        var content = request.body.content;

        Note.create({ content:content })
        .then(note => {
            return response.status(200).json({success:true, data:note.dataValues});
        })
        .catch(error => {
            return response.status(400).json({success:false, message:error.message});
        });
    },

    updateNote: (request, response) => {
        var noteUpdate = request.body;
        var noteId = request.params.id;

        Note.update(noteUpdate, { where: {id: noteId} })
        .then(data => {
            return response.status(200).json({success:true, message:"Note with id="+noteId+", updated."});
        })
        .catch(error => {
            return response.status(400).json({success:false, message: error.message});
        });
    },

    deleteNote: (request, response) => {
        var noteId = request.params.id;

        Note.destroy({
            where: {id: noteId}
        })
        .then(rows => {
            return response.status(200).json({success:true, message:"Note with id="+noteId+", deleted."});
        })
        .catch(error => {
            return response.status(401).send({success:false, message:error.message});
        });
    }

};

module.exports = handler;