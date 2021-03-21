import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  initializeLoginFramework, handleGoogleSignIn, handleFbSignIn,
  handleSignedOut, createUserWithEmailAndPassword, signInwithEmailAndPassword
} from './loginManager';
import './Login.css';
const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    success: false,
    displayName: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        console.log('google',res);
        handleResponse(res, true);
      })
  }
  const signedOut = () => {
    handleSignedOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    if (!newUser && user.email && user.password) {
      signInwithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }
  const handleBlur = (e) => {
    let isFieldValid = true;
    let passwordText ="";
    console.log(e.target.name, e.target.value);
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      if(isFieldValid){ passwordText = e.target.value;}
    }
    if(e.target.name === 'confirmPassword')
    {
      const isConfirmPasswordValid = e.target.value.length > 6;
      
      const confirmPasswordHasNumber = /\d{1}/.test(e.target.value);
      
      isFieldValid = isConfirmPasswordValid && confirmPasswordHasNumber && (e.target.value.length === passwordText.length);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div className="d-flex">
      <div className="login-form align-items-center justify-content-center">
        <h1>{!newUser ?'Login':'Sign Up'}</h1>
        {!newUser &&
          <form onSubmit={handleSubmit}>
          <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email Address" required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder="Your Password" required />
          <br />
          <input type="submit" value={'Sign In'} />
          <p>Don't have an Account?<span className="create-user" onClick={() => setNewUser(!newUser)}>Create a new account</span></p>
        </form>}
        {newUser &&
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your Name" onBlur={handleBlur} required/>
          <br />
          <input type="text" name="email" onBlur={handleBlur} placeholder="Email Address" required />
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
          <br />
          <input type="password" onBlur={handleBlur} name="confirmPassword" placeholder="Confirm Password" required />
          <br />
          <input type="submit" value={'Sign Up'} />
          <p>Already have an Account?<span className="create-user" onClick={() => setNewUser(!newUser)}>Login</span></p>
        </form>}   
        <br />
        <button className="btn-style" onClick={googleSignIn}>Continue With Google</button>
        <button className="btn-primary" onClick={fbSignIn}>Continue With Facebook</button>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
        }
      </div>
    </div>
  );

};

export default Login;
