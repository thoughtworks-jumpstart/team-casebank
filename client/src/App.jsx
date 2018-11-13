import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { getUser, getUserById } from "./data_users.js";
import { getProject, getProjectById } from "./data_projects.js";
import "./App.css";
import Main from "./main";
import SearchTechStack from "./components/search/searchTechStack";
import NavBar from "./components/navBar/navBar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/search" exact component={Main} />
          <Route path="/editor" exact component={Main} />
        </Switch>
        <SearchTechStack />
        <Main />
      </div>
    );
  }
}

export default App;
