import React, { Component } from "react";
import { getProject } from "../../data_projects";
import { getTechstack } from "../../data_techstacks";

const _ = require("lodash");
class SearchTechStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: getProject(),
      techstack: ["all", ...getTechstack()]
    };

    this.handleChange = this.handleChange.bind(this);
    this.getProjectByTechStack = this.getProjectByTechStack.bind(this);
  }

  handleChange(tech) {
    const filteredData = this.getProjectByTechStack(tech);
    this.props.combinedResult(filteredData);
  }

  getProjectByTechStack(techstack) {
    return techstack !== "all"
      ? this.state.project.filter(project =>
          project.techstack.find(item => item === techstack)
        )
      : this.state.project;
  }

  render() {
    const listTechs = this.state.techstack.map(tech => {
      return (
        <button
          onClick={() => {
            this.handleChange(tech);
          }}
          className="dropdown-item"
          href="#"
          key={tech}
        >
          {_.startCase(tech)}
        </button>
      );
    });

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
          Techstack
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {listTechs}
        </div>
      </div>
    );
  }
}

export default SearchTechStack;
