import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
/*
import CreateSet from "./components/oldcomponents/CreateSet";
import ViewSet from "./components/oldcomponents/ViewSet";
import StudySet from "./components/oldcomponents/StudySet";
*/
import LandingPage from "./pages/LandingPage";
import StudySetPage from "./pages/StudySetPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ViewSetsPage from "./pages/ViewSetsPage";
import CreateSetPage from "./pages/CreateSetPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";


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
        <Route path="/set/view/:setId">
          <ViewSetsPage />
        </Route>
        <Route path="/set/create">
          <CreateSetPage />
        </Route>
        <Route path="/set/search">
          <SearchResultsPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
