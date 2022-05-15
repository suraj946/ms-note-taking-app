import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
    const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""});
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const url = `/api/auth/createuser`;
        const response = await fetch(url, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:cred.name, email:cred.email, password:cred.password})
        });
        let json = await response.json();
        if(json.success){
            props.showAlert("Account created successfully", "success");
            localStorage.setItem("token", json.authToken)
            navigate('/');
        }else{
            props.showAlert(json.error, "danger");
        }
    }
    return (
    <div className='container login-signup-mt'>
        <h1>Please signup to create a new account</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={handleChange} required minLength={3}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} required minLength={5}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={handleChange} required minLength={5}/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleChange} required minLength={5}/>
            </div>
            <button disabled={cred.email.length < 5 || cred.password.length < 5 || cred.name.length < 3} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}

export default SignUp;
