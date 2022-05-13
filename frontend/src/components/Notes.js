import React, {useContext, useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext);
    const {note, fetchNotes, editNote} = context;
    const openRef = useRef(null);
    const closeRef = useRef(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({id:"", title:"", description:"", tag:""});
    useEffect(()=>{
        if(localStorage.getItem('token')){
            fetchNotes();
        }else{
            navigate('/login');
        }   
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote)=>{
        openRef.current.click();
        setFormData({id:currentNote._id, title:currentNote.title, description:currentNote.description, tag:currentNote.tag});
    }

    const handleOnChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleOnClick = ()=>{
        editNote(formData.id, formData.title, formData.description, formData.tag);
        closeRef.current.click();
    }
    return (
    <>
        <button ref={openRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">modal</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" value={formData.title} id="title" name='title' aria-describedby="emailHelp" onChange={handleOnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" value={formData.description} id="description" name='description' onChange={handleOnChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" value={formData.tag} id="tag" name='tag' onChange={handleOnChange}/>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <AddNote/>
        <div className="row my-3">
            <div className="container mx-2">
                {note.length <= 0 && "Add some notes to preview here..."}
            </div>
            {note.map((note)=>{
                return <NoteItem key={note._id} updateNote={updateNote} note = {note}/>
            })}
        </div>
    </>
  )
}

export default Notes;
