import React, {useState}from 'react';
import './login.css';
import { validateEmail } from './genricapi';
import {   Stack, TextField } from '@fluentui/react';
import { Password } from './Image/icon';
import { Facebook, Instagram, Lock, Mail, Person } from '@material-ui/icons';
const Login = (props) => {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError,setPasswordError] = useState("");
  const [firstName,setName] = useState("");
  const [errorMessageFirstName, setErrorMessageFirstName] = useState("");
  
  const ChangeForm = () => {
      var signUpButton = document.getElementById('signUp');
      var signInButton = document.getElementById('signIn');
      var container = document.getElementById('container');

    if(signUpButton) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });
    }
      if(signInButton) {
      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      }); }
  }

  const Register = () => {
    if (
      firstName === "" ||
      email === "" ||
      password  === "" )
      {
      setErrorMessageFirstName("Required Field");
      setEmailError("Required Field");
      setPasswordError("Required Field");
    }
      else if(emailError === "" && passwordError === "")
         {
        localStorage.setItem('document',JSON.stringify({email,password,firstName}));
        alert("Registered Successfully!")
      }
  }
  const Submit = () => {
    if (email === "" || password === "") {
      if (password === "") {
        setPasswordError("Password can't be null.");
      }
      if (email === "") {
        setEmailError("Email can't be null.");
      }
      return;
    }
     let data = localStorage.getItem('document')
        data = JSON.parse(data);
      if(data === null){
        alert("Please Register Urself");
      }
      else if((data.email === email) && (data.password === password))
      { 
        alert("Successfully Loged In")
      }
      else{
        alert("PLease Register");
      }
  }

  const validatePassword = (password) =>{
    if(password.length < 4){
      return  "Invalid Password";
    }
    else
    {
      return "";
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const prefixEmail = () => {
    return (
      <div>
        <Mail />
      </div>
    )
  }

  const prefixName = () => {
    return (
      <div>
        <Person />
      </div>
    )
  }

  const prefixPassword = () => {
    return (
      <div>
        <Lock />
      </div>
    )
  }

  const renderSuffix = () => {
    return (
      <span style={{ position: "relative" }}>
        <img
          src={Password}
          alt="password eye"
          className="cursor-pointer"
          onClick={togglePassword}
        />
        {showPassword ? (
          <span
            style={{
              display: "inline-block",
              border: "1px solid #f9f9f9",
              width: "20px",
              transform: "rotate(-35deg)",
              position: "absolute",
              top: "7px",
              left: "4px",
            }}
            className="cursor-pointer"
            onClick={togglePassword}
          />
        ) : null}
      </span>
    );
  }
  const onPasswordChange = (e) => {
    
    setPassword(e.target.value);
    setPasswordError(""); 
  };

  const onFirstNameChange = (e) => {
    setName(e.target.value);
    setErrorMessageFirstName("");
  };


  const PasswordChange = (e) => {
    const validationResult2 = validatePassword(e.target.value);
    if (validationResult2) {
      setPasswordError("Invalid Password");
    }
  }
  const emailChange = (e) => {
    const validationResult = validateEmail(e.target.value);
    if (validationResult) {
      setEmailError("Invalid email");
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
      <div className="container" id="container">
          <div className="form-container sign-up-container">
      <form action="#">
        <h1>Create Account</h1>
        <div className="social-container">
        <div className="social" style={{cursor: "pointer"}}>
                <Instagram />
              </div>
              <div className="social" style={{cursor: "pointer"}}>
               <Facebook />
              </div>
        </div>
        <span>or use your email for registration</span>
        <Stack.Item className='input ml20 mr20 mt10 '>
              <TextField
                      className='width'
                      required
                      placeholder='First Name'
                      onRenderPrefix={prefixName}
                      onChange={onFirstNameChange}
                      errorMessage={errorMessageFirstName}
                    />
            </Stack.Item>
        <Stack.Item className='input ml20 mr20 mt10 '>
          <TextField 
              className='width'
              placeholder='email@domain.com'
              required  
              validateOnLoad={false}
              autoComplete='true'
              onChange={onEmailChange}
              onBlur={emailChange}
              onRenderPrefix={prefixEmail}
              errorMessage={emailError}
          />
          </Stack.Item>
          <Stack.Item className='input ml10 mr10'>
            <TextField
              className='width'
              type={showPassword ? "text" : "Password"}  
              placeholder='Password'
              security
              required
              onChange={onPasswordChange}
              onRenderPrefix={prefixPassword}
              onBlur={PasswordChange}
              errorMessage={passwordError}
              suffix={true}
              onRenderSuffix={renderSuffix}
            />
          </Stack.Item>
        <button onClick={() => Register()} style={{cursor: "pointer"}}>Sign Up</button>
      </form>
    </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <div className="social" style={{cursor: "pointer"}}>
                <Instagram />
              </div>
              <div className="social" style={{cursor: "pointer"}}>
               <Facebook />
              </div>
            </div>
            <span>or use your account</span>
            <Stack.Item className='input ml20 mr20 mt10 '>
              <TextField 
                  className='width'
                  placeholder='email@domain.com'
                  required  
                  validateOnLoad={false}
                  autoComplete='true'
                  onChange={onEmailChange}
                  onRenderPrefix={prefixEmail}
                  onBlur={emailChange}
                  errorMessage={emailError}
              />
              </Stack.Item>
            <Stack.Item className='input ml10 mr10'>
                <TextField
                  className='width'
                  type={showPassword ? "text" : "Password"}  
                  placeholder='Password'
                  security
                  required
                  onChange={onPasswordChange}
                  onBlur={PasswordChange}
                  onRenderPrefix={prefixPassword}
                  errorMessage={passwordError}
                  suffix={true}
                  onRenderSuffix={renderSuffix}
                />
              </Stack.Item>
            <a href="null">Forgot your password?</a>
            <button onClick={() => Submit()} style={{cursor: "pointer"}}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Login Back!</h1>
              <p>Please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => ChangeForm()} style={{cursor: "pointer"}}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>SignUp New User</h1>
              <p>Enter your personal details for SignUp</p>
              <button className="ghost" id="signUp" onClick={() => ChangeForm() } style={{cursor: "pointer"}}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
  );
}


export default Login;
