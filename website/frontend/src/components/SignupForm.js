import React, {useState} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "../css/components/SignupForm.css";


function SignupForm() {
  return(
    <form className="signup-form-container bg-white">
      <h3>Create an Account</h3>
      <OutlinedInput placeholder="Username"/>
      <OutlinedInput placeholder="Password"/>
      <OutlinedInput placeholder="Confirm Password"/>
      <a className="nav-pill-primary">
        Signup
      </a>
    </form>
  )
}

export default SignupForm;