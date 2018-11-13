import React, { Component } from "react";
import SearchTechStack from "./searchTechStack";
import SearchResults from "./searchResults";

export default class Search extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-2">
          <SearchTechStack />
        </div>
        <div className="col">
          <SearchResults />
        </div>
      </div>
    );
  }
}
