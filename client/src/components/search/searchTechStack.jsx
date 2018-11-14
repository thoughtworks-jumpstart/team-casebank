import React, { Component } from "react";
import { getProjects } from "../../data_projects";
import { getTechstack } from "../../data_techstacks";

const _ = require("lodash");
class SearchTechStack extends Component {
  state = {
    techstack: ["All", ...getTechstack().map(tech => _.startCase(tech))]
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
