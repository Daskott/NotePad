import * as NoteActionTypes from '../action_types/note';

var initialState = [];

export default function Note(state=initialState, action){
    switch(action.type){
        
        case NoteActionTypes.SET_NOTES:
            state = action.notes;
            return[
                ...state,
            ];

        case NoteActionTypes.ADD_NOTE:
            return [
                {id: action.id, content: action.content},
                ...state
            ];

        case NoteActionTypes.DELETE_NOTE:
            state.splice(action.index, 1);
            return [
                ...state,
            ];

        case NoteActionTypes.UPDATE_NOTE_CONTENT:
            return state.map((note, index) => {
                if(index === action.index){
                    return {
                        ...note,
                        content: action.content
                    }
                }
                return note;
            });

        default:
            return state;

    }
}