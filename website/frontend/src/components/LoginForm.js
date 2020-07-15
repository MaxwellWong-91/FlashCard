import React, {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "../css/components/LoginForm.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    
})


function LoginForm() {
  const classes = useStyles();

  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    setUser("logged in")
  }

  return(
    <form className="login-form-container bg-white">
      <h3>Welcome Back!</h3>
      <OutlinedInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <OutlinedInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <a className="nav-pill-primary" onClick={handleClick}>
        Login
      </a>
    </form>
  )
}

export default LoginForm;