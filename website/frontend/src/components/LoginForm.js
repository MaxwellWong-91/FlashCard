import React, {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import "../css/components/LoginForm.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: "1rem"
  },
  input: {
    padding: "0.75em 1.25em"
  }
})


function LoginForm() {
  const classes = useStyles();
  const history = useHistory();
  
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
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setError("");
          setUser(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.user);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return(
    <form className="login-form-container bg-white" onSubmit={handleClick}>
      <h3>Welcome Back!</h3>
      <TextField
        classes={{root: classes.root}} 
        value={username} 
        size="small"
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="outlined"
      />
      <TextField
        classes={{root: classes.root}} 
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        variant="outlined"
        type="password"
      />
      {error ? <p className="error">{error}</p> : null}
      <button className="nav-pill-primary" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm;