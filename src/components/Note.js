import React from 'react';
import PropTypes from 'prop-types';

const Note = props =>{
  
    const toggleListItem = event =>{
        props.onToggle(props.index, props.content);
    }

    const getContent = ()=>{
        /**
         * - set note with a content, if any
         * - else set content with placeholder -> "Blank"
         * - if content is > 10 chars, trim it 
         */
        var content = props.content? props.content: "Blank";
        content = content.length > 10? content.substring(0, 10)+"...":content;
        return content;
    }

    return(
        <a href="#" className={"list-group-item note-item "+props.active} onClick={toggleListItem}>
            <h4><strong>{getContent()}</strong></h4>
        </a>
    );
}

Note.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    active: PropTypes.string,
};

export default Note;