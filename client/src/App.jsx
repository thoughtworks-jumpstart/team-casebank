import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Editor from "./components/Editor/Editor";
import Details from "./components/ViewCase/Details";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/editor" exact component={Editor} />
          <Route
            path="/results/details/:id"
            exact
            render={props => {
              return <Details id={props.match.params.id} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
