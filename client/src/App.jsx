import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { getUser, getUserById } from "./data_users.js";
import { getProject, getProjectById } from "./data_projects.js";
import "./App.css";
import Main from "./main";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import Search from "./components/search/search";
import Editor from "./components/Editor/Editor";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/editor" exact component={Editor} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
