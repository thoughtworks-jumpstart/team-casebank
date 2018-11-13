import React, { Component } from "react";
import "./App.css";
import Main from "./main";
import {getUser, getUserById} from "./data_users.js";
import {getProject, getProjectById} from "./data_projects.js";
import SearchTechStack from './component/searchTechStack';

class App extends Component {
  render() {
    
    return (
      <div>
        <SearchTechStack />
      </div>
    );
  }
}

export default App;
