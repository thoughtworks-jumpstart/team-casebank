import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { toggle } from "../../utils/toggle";

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <NavLink className="navbar-brand " to="/">
          CaseBank
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search">
                Search
              </NavLink>
            </li>
            {toggle(
              <li className="nav-item">
                <NavLink className="nav-link" to="/editor">
                  Add
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
