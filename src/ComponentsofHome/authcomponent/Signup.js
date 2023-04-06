import React, { useState } from 'react'
import "../../allcss/Modal.css"
// import { auth } from '../../firebas';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebas';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
const Signup = ({handleClose}) => {
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [confirmpassword,setconfirmpassword]=useState();
    const googleauth=new GoogleAuthProvider();
    function handlechange(e,type){
        if(type==="email"){
            setemail(e.target.value)
        }
        else if(type==="confirmpassword"){
            setconfirmpassword(e.target.value);
        }
        else{
            setpassword(e.target.value);
        }


    }
    async function handlesubmit(e){
        e.preventDefault();
        if(password===confirmpassword && email!==null && password!==null){
          let result= await createUserWithEmailAndPassword(auth,email,password);
          handleClose();
        console.log("success");
        }
        else{
            console.log("error");
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
        <input type='password' placeholder='Confirm Your Password' value={confirmpassword} name='confirmpassword' onChange={(e)=>{handlechange(e,"confirmpassword")}}/>
        <button type='submit'>Sign Up</button>
        <span id="or" style={{alignSelf: "center"}}>OR</span>
        <GoogleButton onClick={loginwithgoogle} style={{width: "100%"}}/>
      </form>
    </div>
  )
}

export default Signup
