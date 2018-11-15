import React, { Component } from "react";
import { getTechstack } from "../../data/techStackService";

let uppercaseFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.substr(1);

class SearchTechStack extends Component {
  state = {
    techstack: [
      "All",
      ...getTechstack().map(tech => uppercaseFirstLetter(tech))
    ]
  };

  render() {
    const { onClick, selectedOptions } = this.props;

    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Techstack: {selectedOptions}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {this.state.techstack.map(tech => (
            <button
              onClick={() => onClick(tech)}
              className="dropdown-item"
              key={tech}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchTechStack;
