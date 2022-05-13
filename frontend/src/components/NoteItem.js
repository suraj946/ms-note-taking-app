import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{props.note.title}</h5>
                        <i className="fas fa-trash-alt mx-3" onClick={()=>{deleteNote(props.note._id)}}></i>
                        <i className="far fa-edit xm-3" onClick={()=>{props.updateNote(props.note)}}></i>
                    </div>
                    <p className="card-text">{props.note.description}</p>
                    <p className="card-text">Tag : {props.note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;
