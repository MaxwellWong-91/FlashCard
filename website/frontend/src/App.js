import React, {useState, useMemo} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudySetPage from "./pages/StudySetPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ViewSetsPage from "./pages/ViewSetsPage";
import CreateSetPage from "./pages/CreateSetPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import {UserContext} from "./context/UserContext";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:8080";
//axios.defaults.withCredentials = true;

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 500;
}

function App() {
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => 
    ({user, setUser}), [user, setUser]
  );

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
        <UserContext.Provider value = {providerValue}> 
          <Route exact path="/" component={LandingPage} />
          <Route path="/set/study/:setId" component={StudySetPage} />
          <Route path="/set/view" component={ViewSetsPage} />
          <Route path="/set/create" component={CreateSetPage} />
          <Route path="/set/search" component={SearchResultsPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
