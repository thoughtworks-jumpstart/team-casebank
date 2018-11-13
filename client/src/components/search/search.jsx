import React, { Component } from "react";
import SearchTechStack from "./searchTechStack";
import SearchResults from "./searchResults";

export default class Search extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchTechStack />
          </div>
          <div className="col-8">
            <SearchResults />
          </div>
        </div>
      </div>
    );
  }
}
