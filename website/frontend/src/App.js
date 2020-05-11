import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateSet from "./components/CreateSet";
import ViewSet from "./components/ViewSet";
import StudySet from "./components/StudySet";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path = "/set/create" component={CreateSet} />
      <Route path = "/set/view" component={ViewSet} />
      <Route path = "/set/study/:id" component={StudySet} />
    </Router>
  );
}

export default App;
