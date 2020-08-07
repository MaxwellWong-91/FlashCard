import React, {useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import "../css/components/SignupForm.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
  input: {
    padding: "0.75em 1.25em"
  }
})

function SignupForm() {
  const classes = useStyles();
  const history = useHistory()

  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    var data = {
      username: username,
      password1: password1,
      password2: password2
    }
    
    axios.post("/api/user/register", data)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setError("");
          setUser(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("token", res.data.user);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })

  }

  return(
    <form className="signup-form-container bg-white" onSubmit={handleClick}>
      <h3>Create an Account</h3>
      <TextField
        classes={{root: classes.root, input: classes.input}} 
        value={username}
        size="small"
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="outlined"
      />
      <TextField
        classes={{root: classes.root, input: classes.input}} 
        label="Password"
        value={password1} 
        size="small"
        onChange={(e) => setPassword1(e.target.value)}
        variant="outlined"
      />
      <TextField 
        classes={{root: classes.root, input: classes.input}} 
        label="Confirm Password" 
        value={password2} 
        size="small"
        onChange={(e) => setPassword2(e.target.value)}
        variant="outlined"
      />
      {error ? <p className="error">{error}</p> : null}
      <button className="nav-pill-primary" type="submit">
        Signup
      </button>
    </form>
  )
}

export default SignupForm;