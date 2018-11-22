import React, { Component } from "react";
import HomeCarousel from "./HomeCarousel";
import HomeHighlights from "./HomeHighlights";

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeCarousel />
        <div className="container">
          <HomeHighlights />
        </div>
      </div>
    );
  }
}
