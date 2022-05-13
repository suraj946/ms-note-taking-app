import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import NoteState from './context/notes/NoteState';

function App() {
  const[alert, setAlert] = useState(null);

  const showAlert = (msg, type)=>{
    setAlert({
      msg : msg,
      type : type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState showAlert={showAlert} >
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
