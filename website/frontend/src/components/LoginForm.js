import React, {useState} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "../css/components/LoginForm.css";


function LoginForm() {
  return(
    <form className="login-form-container bg-white">
      <h3>Welcome Back!</h3>
      <OutlinedInput placeholder="Username"/>
      <OutlinedInput placeholder="Password"/>
      <a className="nav-pill-primary">
        Login
      </a>
    </form>
  )
}

export default LoginForm;