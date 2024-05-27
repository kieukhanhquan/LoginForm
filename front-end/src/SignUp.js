import React,{useState} from "react"
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
function SignUp() {
  const [value,setValue] = useState({
    email:"",
    password:""
  })
  const handleInput = (event)=>{
    setValue(prev=>({...prev,[event.target.name]:[event.target.value]}))
  }
  const navigate = useNavigate();
  const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:8080/signup', value)
    .then( res => {
      if(res.data==="Success"){
        navigate('/login')
      }
    })
    .catch(err => console.log(err));
  }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form action = "" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input onChange={handleInput} type="email" placeholder="Enter email" className="form-control" name="email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input onChange={handleInput}type="password" placeholder="Enter password" className="form-control" name="password"/>
              </div>
              <button type="submit" className="btn btn-success w-100">Register</button>
              <p>You already have an account?</p>
              <Link to="/login" className="btn btn-default border w-100">Login</Link>
            </form>
        </div>
    </div>
  );
}

export default SignUp;
