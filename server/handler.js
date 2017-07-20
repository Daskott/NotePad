var models = require('../models');
var Note = models.Note;


var handler = {
    getAllNotes: (request, response) => {
        Note.findAll({order: [['id','DESC']]})
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