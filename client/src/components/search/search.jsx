import React, { Component } from "react";
import SearchOptions from "./searchOptions";
import SearchResults from "./searchResults";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: []
    };
  }

  filteredResults = filtered => {
    console.log(filtered);
    this.setState({ resultList: filtered });
  };

  render() {
    return (
      <div className="row">
        <div className="col-2 ml-4">
          <SearchOptions filteredResults={this.filteredResults} />
        </div>
        <div className="col mr-4">
          <SearchResults resultList={this.state.resultList} />
        </div>
      </div>
    );
  }
}
