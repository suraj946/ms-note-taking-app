import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [cred, setCred] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const url = `/api/auth/login`;
        const response = await fetch(url, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:cred.email, password:cred.password})
        });
        let json = await response.json();
        if(json.success){
            props.showAlert("Logged in successfully", "success");
            localStorage.setItem("token", json.authToken)
            navigate('/');
        }else{
            props.showAlert(json.error, "danger");
        }
    }
    return (
        <>
        <div className='login-signup-mt'>
            <h1>Please login to continue with iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} required minLength={5}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} required minLength={5}/>
                </div>
                <button disabled={cred.email.length < 5 || cred.password.length < 5} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Login;
