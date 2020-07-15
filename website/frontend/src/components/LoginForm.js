import React, {useState} from "react";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "../css/components/LoginForm.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    
})


function LoginForm() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return(
    <form className="login-form-container bg-white">
      <h3>Welcome Back!</h3>
      <OutlinedInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <OutlinedInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <a className="nav-pill-primary">
        Login
      </a>
    </form>
  )
}

export default LoginForm;