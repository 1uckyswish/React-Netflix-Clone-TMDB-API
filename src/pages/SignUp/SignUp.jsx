import React,{useState,useContext} from 'react'
import './signUp.css'
import axios from 'axios';
import {UserContext} from '../../context/UserContext'
import {ThemeContext} from '../../context/ThemeContext';
import { Link } from 'react-router-dom';


function SignUp({serverUrl}) { 
    const {token} = useContext(UserContext)
    const {darkMode,setDarkMode}=useContext(ThemeContext)
    const[email, setEmail]=useState('')
    const[username, setUsername]=useState('')
    const[password, setPassword]=useState('')
    const[success, setSuccess]=useState(false)
 
    const handleSignUp =(e)=>{
        e.preventDefault();
        axios.post(`${serverUrl}/users/signup`, {email,password, username})
        .then(res=>{
            if(res.data.status===409){
            alert('There is another user with that email. Try again')
        }else{
            setSuccess(true)
            setPassword('')
            setEmail('')
            setUserName('')
        }
        })
        .catch(err=>console.log(err))
    }
 
  return ( 
    <div className={darkMode ? "signup-container" : "signup-container signup-light"} >

        {
            
           
            <form className="signup-form">
            <div className="title-container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            </div>


            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}> 
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="Enter Email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="psw">Password</label>
                <input value={password} type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="username">Username</label>
                <input value={username} type="text" placeholder="Enter Username" name="username" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>

            <div className="button-container">
                <button type="reset" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
            </div>
        
            <p className="signup-message">Already have an account? <Link to="/signin">SignIn</Link></p> 
        
        </form>
        }
        
    </div>
  )
}

export default SignUp