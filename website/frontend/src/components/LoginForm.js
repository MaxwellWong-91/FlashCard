import React, {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import axios from "axios";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "../css/components/LoginForm.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
  input: {
    padding: "0.75em 1.25em"
  }
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
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setError("");
          setUser(res.data.token);
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return(
    <form className="login-form-container bg-white" onSubmit={handleClick}>
      <h3>Welcome Back!</h3>
      <OutlinedInput classes={{root: classes.root, input: classes.input}} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <OutlinedInput classes={{root: classes.root, input: classes.input}} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      {error ? <p className="error">{error}</p> : null}
      <button className="nav-pill-primary" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm;