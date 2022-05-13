import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [formData, setFormData] = useState({title:"", description:"", tag:""});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(formData.title, formData.description, formData.tag);
        setFormData({title:"", description:"", tag:""});
    }
    const handleOnChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
        // console.log({title:"tag", description:"dec", tag:"tag", [e.target.name]:e.target.value});
    }
    return (
        <div className="container my-3">
          <h1>Add a Note</h1>
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
            <button disabled={formData.title.length < 3 || formData.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
          </form>
        </div>
    )
}

export default AddNote;
