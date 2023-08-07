import React,{useState,useEffect,useContext} from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import './signIn.css'
import {UserContext} from '../../context/UserContext';
import {ThemeContext} from '../../context/ThemeContext';

function SignIn({serverUrl}) {
    const navigate = useNavigate();
    const {user,setUser,token,setToken}=useContext(UserContext) 
    const {darkMode,setDarkMode}=useContext(ThemeContext)  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');



    const handleSignIn=(e)=>{ 
        e.preventDefault();
        axios.post(`${serverUrl}/users/login`,{email,password})
        .then(res=>{
            console.log(res.data)
            setUser(res.data)
            setToken(res.data.token)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            navigate('/')
        })
        .catch(err=>console.log(err))   
    } 
  return (
    <div className={darkMode ? "signup-container" : "signup-container signup-light"}>
        {
            token
            ? <p>You are already loggedin.</p>
            : <form className="signup-form" onSubmit={handleSignIn}> 
            <div className="title-container">
                <h1>Sign In</h1>
                <p>Please fill in this form to login.</p>
            </div>  
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}> 
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="Enter Email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="psw">Password</label>
                <input value={password} type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="button-container">
                <button type="reset" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign In</button>
            </div>
 
            <p className="signin-message">Don't have an account? <Link to="/signup">Signup</Link></p>

        </form>
        } 
    
</div>
  )
}

export default SignIn