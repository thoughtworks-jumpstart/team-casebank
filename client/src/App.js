import React, { Component } from "react";
import "./App.css";
import Main from "./main";
<<<<<<< HEAD
import {getUser, getUserById} from "./data_users.js";
import {getProject, getProjectById} from "./data_projects.js";
import SearchTechStack from './component/searchTechStack';
=======
import { getUser, getUserById } from "./data_users.js";
import { getProject, getProjectById, getProjectByTS } from "./data_projects.js";
>>>>>>> Kaixin #30 Add searchResult component to display results table

class App extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        <SearchTechStack />
=======
        <Main />
>>>>>>> Kaixin #30 Add searchResult component to display results table
      </div>
    );
  }
}

export default App;
