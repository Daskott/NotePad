import React from 'react';
import PropTypes from 'prop-types';


const Toolbar = props =>{
  
    const deleteNote = () =>{
        props.onDelete();
    }

    const addNewNote = () =>{
        props.onAdd();
    }

    return(
      <div className="toolbar margin-default padding-default"> 
        <button type="button" title="New note" className="add-btn btn btn-default glyphicon glyphicon-edit margin-right" onClick={addNewNote}></button>
        <button type="button" title="Delete note" className="delete-btn btn btn-default glyphicon glyphicon-trash margin-right" onClick={deleteNote}></button>
        <span>{props.savingNoteIndicator}</span>
      </div>
    );
}

Toolbar.propTypes = {
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    savingNoteIndicator:PropTypes.string,
};

export default Toolbar;