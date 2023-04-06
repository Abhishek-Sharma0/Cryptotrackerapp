import React, { useState } from 'react'
import "../../allcss/Modal.css"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebas';

import GoogleButton from 'react-google-button';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
const Login = ({handleClose}) => {
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const[buttontext,setbuttontext]=useState("Login");
    const googleauth=new GoogleAuthProvider();
    function handlechange(e,type){
        if(type==="email"){
            setemail(e.target.value)
        }
        else{
            setpassword(e.target.value);
        }


    }
    async function handlesubmit(e){
        e.preventDefault();
        if(email!==null && password!==null){
          let result= await signInWithEmailAndPassword(auth,email,password); 
          handleClose();
        console.log("success login");
        }
        else{
            console.log("error login");
        }
    }
    async function loginwithgoogle(){
        await signInWithPopup(auth,googleauth);
        handleClose();

    }
  return (
    <div className='logincontainer'>
      <form onSubmit={handlesubmit}>
        <input type={'email'} placeholder="Enter your Email" value={email} name='email' onChange={(e)=>{handlechange(e,"email")}}/>
        <input type='password' placeholder='Enter Your Password' value={password} name='password' onChange={(e)=>{handlechange(e,"password")}}/>
        <button type='submit'>{buttontext}</button>
        <span id="or" style={{alignSelf: "center"}}>OR</span>
        <GoogleButton onClick={loginwithgoogle} style={{width: "100%"}} label="Login With Google"/>
      </form>
    </div>
  )
}

export default Login;
