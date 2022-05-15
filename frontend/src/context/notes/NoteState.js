import noteContext from "./noteContext";
import { useState } from 'react';


const NoteState = (props)=>{
    // const host = "http://localhost:1352/";
    const [note, setNote] = useState([]);

    const fetchNotes = async()=>{
      const url = `/api/notes/fetchnotes`;
      const response = await fetch(url, {
        method:"GET",
        headers:{
          'Accept': 'application/json',
          'auth-token' : localStorage.getItem('token')
        }
      });
      let json = await response.json();
      setNote(json);
      console.log(json);
    }

    const addNote = async (title, description, tag)=>{
      const url = `/api/notes/addnote`;
      if(tag===""){
        tag = undefined
      }
      const response = await fetch(url, {
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
      });
      let addToNote = await response.json();
      setNote(note.concat(addToNote));
      props.showAlert("Note added", "success");
    }
    const deleteNote = async (id)=>{
      const url = `/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method:"DELETE",
        headers:{
          'Content-Type':'application/json',
          'auth-token' : localStorage.getItem('token')
        }
      });
      // let json = await response.json();
      // console.log(json.note._id === id);
      let newNote = note.filter((n) => n._id !== id);
      setNote(newNote);
      props.showAlert("Note deleted", "success");
    }

    const editNote = async (id, title, description, tag)=>{
      const url = `/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method:"PUT",
        headers:{
          'Content-Type':'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body:JSON.stringify({title, description, tag})
      });
      let updateToNote = await response.json();
      let newNotes = JSON.parse(JSON.stringify(note));
      for (let i = 0; i < newNotes.length; i++) {
          if(newNotes[i]._id === id){
            newNotes[i].title = updateToNote.title;
            newNotes[i].description = updateToNote.description;
            newNotes[i].tag = updateToNote.tag;
            break;
          }
      };
      setNote(newNotes);
      props.showAlert("Note updated", "success");
    }

    return(
        <noteContext.Provider value={{note, addNote, deleteNote, fetchNotes, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;