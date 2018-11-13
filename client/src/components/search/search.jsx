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
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchOptions filteredResults={this.filteredResults} />
          </div>
          <div className="col-8">
            <SearchResults resultList={this.state.resultList} />
          </div>
        </div>
      </div>
    );
  }
}
