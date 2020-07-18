import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Logo from "../images/logo.svg";
import "../css/components/Navbar.css";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


function Navbar() {
  const {user, setUser} = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white">
      <ul>
        <li className="nav-brand">
          <Link className="brand-container" to="/">
            <img className="brand-logo" src={Logo}></img><h3 className="brand-name">Flashcard Manager</h3>
          </Link>
        </li>
        {/* <input 
          className="searchbar outer-menu-searchbar"
          type="text"
          placeholder="Search for flashcard set"/> */}
        <li className="search-container">
          <input 
          className="searchbar outer-menu-searchbar"
          type="text"
          placeholder="Search for flashcard set"/>
          
        </li>
        <li className="nav-list-button-container">
          <input 
          className="searchbar inner-menu-searchbar"
          type="text"
          placeholder="Search for flashcard set"/>
          <ul className={`nav-button-container ${menuOpen ? "nav-open" : ""}`}>
            {
              user ? 
              <>
                <li className="nav-button">
                  <a className="nav-pill-primary">View Your Sets</a>
                </li>
                <li className="nav-button">
                  <a className="nav-pill-primary">Create Set</a>
                </li>  
                <li className="nav-button">
                  <a className="nav-pill-secondary" onClick={(e) => setUser(null)}>Logout</a>
                </li>
              </>
              :
              <>
                <li className="nav-button">
                  <a className="nav-pill-primary">Login</a>
                </li> 
                <li className="nav-button">
                  <a className="nav-pill-secondary">Signup</a>
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

/*import React, {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to = "/">Flashcards</Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to = "/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to = "/set/create">Create Set</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to = "/set/view">View Set</Link>
            </li>
          </ul>
          
        </div>
      </nav>

    )
  }
}

export default Navbar;
*/