import React, { Component } from "react";
import HomeCarousel from "./HomeCarousel";
import HomeHighlights from "./HomeHighlights";
import Login from "../UserDetails/Login";

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeCarousel />
        <div className="container">
          <HomeHighlights />
          <Login />
        </div>
      </div>
    );
  }
}
