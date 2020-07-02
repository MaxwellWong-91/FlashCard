import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CreateSet from "./components/CreateSet";
import ViewSet from "./components/ViewSet";
import StudySet from "./components/StudySet";
import LandingPage from "./pages/LandingPage";
import StudySetPage from "./pages/StudySetPage";


function App() {
  return (
    /*
    <Router>
      <Navbar />
      <Route path = "/set/create" component={CreateSet} />
      <Route path = "/set/view" component={ViewSet} />
      <Route path = "/set/study/:id" component={StudySet} />
    </Router>
    */
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/set/study/:setId">
          <StudySetPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
