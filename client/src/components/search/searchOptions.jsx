import React, { Component } from "react";
import SearchTechStack from "./searchTechStack";

export default class SearchOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  combinedResult = res => {
    let newArray = [...res];
    this.setState({ results: res });
    this.props.filteredResults(newArray);
  };
  render() {
    return (
      <div>
        <SearchTechStack combinedResult={this.combinedResult} />
      </div>
    );
  }
}
