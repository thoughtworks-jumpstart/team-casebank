import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { toggle } from "../../utils/toggle";
import logo from "../../logo.png";
import { logout } from "../../data/userService";
import { AuthConsumer } from "../UserDetails/AuthContext";
import { withRouter } from "react-router";

class NavBar extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, name, logout }) => (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand " to="/">
              <img src={logo} alt="logo of Owl" width="80%" height="80%" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                {toggle(
                  <li className="nav-item">
                    <NavLink exact className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/search">
                    Search
                  </NavLink>
                </li>
                {isAuth &&
                  toggle(
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/editor">
                        Add
                      </NavLink>
                    </li>
                  )}
              </ul>
            </div>
            {this.displayUserMenu(this.props.location.pathname) && (
              <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                  {name !== "" && (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="."
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {name}
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <a
                          className="dropdown-item"
                          onClick={event => {
                            this.submitLogout(logout, event);
                          }}
                          href="#1"
                        >
                          Logout
                        </a>
                      </div>
                    </li>
                  )}
                  {name === "" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </nav>
        )}
      </AuthConsumer>
    );
  }

  submitLogout = async (logoutFunction, event) => {
    event.preventDefault();
    await logout();
    logoutFunction();
  };

  displayUserMenu = currentPath => {
    for (let identifiedStr of this.pathsToOmitUserMenu) {
      if (currentPath.includes(identifiedStr)) {
        return false;
      }
    }
    return true;
  };

  pathsToOmitUserMenu = ["details"];
}

export default withRouter(NavBar);
