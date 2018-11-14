import React, { Component } from "react";
import SearchTechStack from "./SearchTechStack";

export default class SearchOptions extends Component {
  render() {
    const { selectedOptions, onClick } = this.props;
    return (
      <div>
        <SearchTechStack onClick={onClick} selectedOptions={selectedOptions} />
      </div>
    );
  }
}
