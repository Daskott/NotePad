import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as NoteActionCreators from '../actions/note';
import Note from '../components/Note';
import Toolbar from '../components/Toolbar';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Application extends Component{
  static propTypes = {
    notes: PropTypes.array.isRequired
  };

  constructor(props){
      super(props);
      this.state = {
        notes: props.notes,
        selectedIndex: 0,
        savingNoteIndicator:"",
        textAreaContent: props.notes.length > 0? props.notes[0].content : "",
      };

      this.deleteSelectedNote = this.deleteSelectedNote.bind(this);
      this.onSelectedNoteChanged = this.onSelectedNoteChanged.bind(this);
      this.onTextAreaChange = this.onTextAreaChange.bind(this);
      this.addNewNote = this.addNewNote.bind(this);
  }

  componentDidMount(){    
    /**
     * - get Notes from database
     * - initialiaze component with retrieved notes
     */
    var self = this;
    const {setNotes} = this.props;
    axios.get('/api/notes')
    .then(function (response) {
        var notes = [{id:1, content:""}]
        notes = response.data.data;
        setNotes(notes);
        self.setState({textAreaContent: notes.length > 0? notes[0].content : ""});
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
  }

  onSelectedNoteChanged = (index, selectedContent) =>{
    var totalNotes = this.props.notes.length;
    if(totalNotes <=  0)return;
    this.setState({ selectedIndex: index, textAreaContent: selectedContent});
  }

  onTextAreaChange = event =>{
    const self = this;
    const {updateNoteContent, notes} = this.props;
    const selectedIndex = this.state.selectedIndex;
    if(notes.length <=  0)return;

    var updatedNote = notes[selectedIndex];
    updatedNote.content = event.target.value;
    
    /**
     * - update application textArea
     * - then update selected note using api call
     */
    updateNoteContent(self.state.selectedIndex, updatedNote.content.trim());
    self.setState({textAreaContent: updatedNote.content, savingNoteIndicator: "Saving..."});

    axios.put('/api/note/'+updatedNote.id, updatedNote)
    .then(function (response) {
        if(!response.data.success)return;

        // auto save
        self.setState({savingNoteIndicator:""});
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
  
  }

  addNewNote(){
    const {addNote, notes} = this.props;
    const len = notes.length;
    var self = this;
    
    // if prev note is empty, return
    if(len > 0 && notes[0].content.trim() === ""){
      this.setState({selectedIndex: 0, textAreaContent:""});
      return;
    } 
    
    /**
     * - add new note using api call
     * - then update the state of the application
     */
    axios.post('/api/note/add', {
        content: ""
    })
    .then(function (response) {
        var data = response.data;
        if(!data.success)return;
        var note = data.data;
        
        addNote(note.id, "");
        self.setState({selectedIndex: 0, textAreaContent:""});
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
  }
  
  deleteSelectedNote(){
    const {deleteNote, notes} = this.props;
    const self = this;
    var selectedIndex = this.state.selectedIndex;

    if(selectedIndex < 0)return;
    
    /**
     * - delete selected note using api call,
     * - then update application state
     */
    const selectedNoteId = notes[selectedIndex].id;
    axios.delete('/api/note/'+selectedNoteId)
    .then(function (response) {
        if(!response.data.success)return;
        
        /**
         * update application state
         */
        deleteNote(selectedIndex);

        // set next selected index
        var totalNotes = notes.length;
        if(selectedIndex >= totalNotes && totalNotes > 0)
          selectedIndex-=1;
        else if(totalNotes < 1)
          selectedIndex = 0;

        /**
         * - update selected note and the text area
         * - if all notes have been deleted, add empty note
         */
        var text = "";
        if(totalNotes > 0)
          text = notes[selectedIndex].content;
        self.setState({selectedIndex: selectedIndex, textAreaContent: text});
    })
    .catch(function (error) {
        console.log("Error: ", error);
    });
  }

  render(){
    const {notes} = this.props;    
    const noteComponents = notes.map((note, index) =>(
      <Note 
          content={note.content} 
          index={index} 
          id={note.id} 
          key={note.id} 
          active={this.state.selectedIndex === index? "active-note" : ""} 
          onToggle={this.onSelectedNoteChanged}/>
    ), this);

    let textArea = null;
    if(this.props.notes.length > 0){
      textArea = (
        <textarea 
                className="text-content" 
                placeholder={"Add Note"}
                value={this.state.textAreaContent}
                onChange={this.onTextAreaChange}>
      </textarea>)
    } else{
      textArea = (
        <textArea className="text-content disabled-textArea" disabled={true}>
          &#8598; Create your first Note :)
        </textArea>)
    }

    return(
      <div className="margin-top-3x">
        <div className="header">
            <h1>Note Pad</h1>
        </div>

        <div className="content">
          <Toolbar onDelete={this.deleteSelectedNote} onAdd={this.addNewNote} savingNoteIndicator={this.state.savingNoteIndicator}/>
          
          <div className="SplitPane">
            
            {/* Notes */}
              <ReactCSSTransitionGroup 
                    component="div" 
                    className="SplitPane-left list-group" 
                    transitionName="slide" 
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={500}>
                {noteComponents}
              </ReactCSSTransitionGroup>

            {/* TextArea */}
            <div className="SplitPane-right">
              {textArea}
            </div>
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state =>({notes: state});
const mapDispatchToProps = dispatch => {
  return {
    setNotes: notes => {
      dispatch(NoteActionCreators.setNotes(notes))
    },
    addNote: (id, content) => {
      dispatch(NoteActionCreators.addNote(id, content))
    },
    updateNoteContent: (selectedIndex, content) =>{
      dispatch(NoteActionCreators.updateNoteContent(selectedIndex, content));
    },
    deleteNote: (selectedIndex) =>{
      dispatch(NoteActionCreators.deleteNote(selectedIndex));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Application);