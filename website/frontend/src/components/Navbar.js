import React, {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext, UserNameContext} from "../context/UserContext";
import axios from "axios";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Logo from "../images/logo.svg";
import "../css/components/Navbar.css";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles({
  inputRoot: {
    padding: "0.5em",
  },
  input: {
    padding: "0.75em 1.25em"
  },
  inputMobile: {
    backgroundColor: "white"
  }
});

function Navbar({history}) { 
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext);
  const {username, setUsername} = useContext(UserNameContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  const handleLogout = (e) => {
    setUser(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  useEffect(() => {
    axios.get("/api/set/names")
      .then((res) => {
        // console.log(res.data);
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  const handleSubmit = (e, value) => {
    if (value) {
      history.push({
        pathname: "/set/search", 
        search: "?name=" + value
      })
    }
  }

  return (
    <nav className="navbar bg-white">
      <ul className="navbar-container">
        <li className="nav-brand">
          <Link className="brand-container" to="/">
            <img className="brand-logo" src={Logo}></img><h3 className="brand-name">Flashcard Manager</h3>
          </Link>
        </li>
        <li className="search-container">
          <Autocomplete 
            className="searchbar outer-menu-searchbar"
            classes={{
              input: classes.inputRoot,
              inputRoot: classes.inputRoot
            }}
            options={options}
            onChange={handleSubmit}
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="Find flashcard sets" 
                variant="outlined"
              />
            }
          />
          
        </li>
        <li className={`nav-list-button-container ${menuOpen && "nav-open"}`}>
            <div className="nav-list-icon-wrapper">
                <CloseIcon style={{color: "white"}} onClick={(e) => setMenuOpen(false)} />
            </div>
            <Autocomplete 
              className="searchbar inner-menu-searchbar"
              classes={{
                input: classes.inputRoot,
                inputRoot: classes.inputMobile
              }}
              options={options}
              onChange={handleSubmit}
              renderInput={(params) => 
                <TextField 
                  {...params} 
                  label="Find flashcard sets" 
                  variant="outlined"
                />
              }
            />
          <ul className="nav-button-container">
            {
              user ? 
              <>
                <li className="nav-button">
                  <Link className="nav-pill-primary" to="/set/view">View Your Sets</Link>
                </li>
                <li className="nav-button">
                  <Link className="nav-pill-primary" to="/set/create">Create Set</Link>
                </li>  
                <li className="nav-button">
                  <a className="nav-pill-secondary" onClick={handleLogout}>Logout</a>
                </li>
              </>
              :
              <>
                <li className="nav-button">
                  <Link className="nav-pill-primary" to="/login">Login</Link>
                </li> 
                <li className="nav-button">
                  <Link className="nav-pill-secondary" to="/signup">Signup</Link>
                </li>
              </>
            }
          </ul>
        </li>
        <li className="toggle-menu">
          <MenuIcon 
          onClick={(e) => setMenuOpen(!menuOpen)}/>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;
