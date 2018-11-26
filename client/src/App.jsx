import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Editor from "./components/NewProject/Editor";
import Details from "./components/ViewCase/Details";
import Login from "./components/UserDetails/Login";
import UserDetails from "./components/UserDetails/UserDetails";
import { toggleToAnother } from "./utils/toggle";
import { AuthProvider } from "./components/UserDetails/AuthContext";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>
          <NavBar />
          <Switch>
            {toggleToAnother(
              <Route path="/" exact component={Search} />,
              <Route path="/" exact component={Home} />
            )}
            <Route path="/search" exact component={Search} />
            <Route path="/login" exact component={Login} />
            <Route path="/editor" exact component={Editor} />
            <Route
              path="/results/details/:id"
              exact
              render={props => {
                return <Details id={props.match.params.id} />;
              }}
            />
            <Route
              path="/userdetails/:id"
              exact
              render={props => {
                return <UserDetails id={props.match.params.id} />;
              }}
            />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
