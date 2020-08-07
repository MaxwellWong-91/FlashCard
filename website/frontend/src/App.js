import React, {useState, useMemo} from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import StudySetPage from "./pages/StudySetPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ViewSetsPage from "./pages/ViewSetsPage";
import CreateSetPage from "./pages/CreateSetPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import {UserContext, UserNameContext} from "./context/UserContext";
import axios from "axios";



if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://flashcard-manager-api.herokuapp.com";
}

axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 500;
}

function App() {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const providerValue = useMemo(() => 
    ({user, setUser}), [user, setUser]
  );

  return (
    <Router>
      <Switch>
        <UserContext.Provider value={providerValue}> 
            <UserNameContext.Provider value={{username, setUsername}}>
              <Route exact path="/" component={LandingPage} />
              <Route path="/set/study/:setId" component={StudySetPage} />
              <PrivateRoute path="/set/view" component={ViewSetsPage} />
              <PrivateRoute path="/set/create" component={CreateSetPage} />
              <Route path="/set/search" component={SearchResultsPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
          </UserNameContext.Provider>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
