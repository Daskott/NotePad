import * as NoteActionTypes from '../action_types/note';

export const setNotes = (notes) => {
    return{
        type: NoteActionTypes.SET_NOTES,
        notes
    };
}

export const addNote = (id, content) => {
    return{
        type: NoteActionTypes.ADD_NOTE,
        id,
        content
    };
}

export const deleteNote = index => {
    return{
        type: NoteActionTypes.DELETE_NOTE,
        index
    };
}

export const updateNoteContent = (index, content) => {
    return{
        type: NoteActionTypes.UPDATE_NOTE_CONTENT,
        index,
        content
    };
}