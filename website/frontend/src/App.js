import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Popper from 'popper.js';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateSet from "./components/CreateSet";
import ViewSet from "./components/ViewSet";
import StudySet from "./components/StudySet";
import ProgressBar from "./components/ProgressBar";

function App() {
  return (
    <div>
        <Router>
            <Navbar />
            <Route path = "/set/create" component={CreateSet} />
            <Route path = "/set/view" component={ViewSet} />
            <Route path = "/set/study/:id" component={StudySet} />
        </Router>
    </div>

  );
}

export default App;
