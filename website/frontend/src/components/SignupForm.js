import React, {useState} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "../css/components/SignupForm.css";


function SignupForm() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return(
    <form className="signup-form-container bg-white">
      <h3>Create an Account</h3>
      <OutlinedInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <OutlinedInput placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)}/>
      <OutlinedInput placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
      <p className="error">error</p>
      <a className="nav-pill-primary">
        Signup
      </a>
    </form>
  )
}

export default SignupForm;