import React, {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import axios from "axios";
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
  const [error, setError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    var data = {
      username: username,
      password: password
    }
    
    axios.post("/api/user/login", data)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          setError(res.data.error);
        }
        setUser(res.data.token);
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return(
    <form className="login-form-container bg-white" onSubmit={handleClick}>
      <h3>Welcome Back!</h3>
      <OutlinedInput placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <OutlinedInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <p className="error">{error}</p>
      <button className="nav-pill-primary" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm;