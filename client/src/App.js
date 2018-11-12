import React, { Component } from "react";
import "./App.css";
import Main from "./main";
import {getUser, getUserById} from "./data_users.js";
import {getProject, getProjectById,getProjectByTS} from "./data_projects.js";


class App extends Component {
  render() {
    
    return (
     
      <div>
        {console.log(getUser())}
        {console.log(getUserById("asd2390384jkbudis"))}
        {console.log(getProject())}
        {console.log(getProjectById("0005"))}
        {console.log(getProjectById("javascript"))}
      </div>
    );
  }
}

export default App;
