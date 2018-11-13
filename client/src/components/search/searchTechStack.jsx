import React, { Component } from "react";
import { getProject } from "../../data_projects";
import { getTechstack } from "../../data_techstacks";

class SearchTechStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: getProject(),
      techstack: getTechstack(),
      value: "all"
    };

    this.handleChange = this.handleChange.bind(this);
    this.getProjectByTechStack = this.getProjectByTechStack.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toLowerCase() });
  }

  getProjectByTechStack(techstack) {
    return techstack !== "all"
      ? this.state.project.filter(project =>
          project.techstack.find(item => item === techstack)
        )
      : this.state.project;
  }

  render() {
    const filteredData = this.getProjectByTechStack(this.state.value);

    const display = filteredData.map(project => {
      return <h5 key={project.name}>Project: {project.name}</h5>;
    });

    const listTechs = this.state.techstack.map(tech => {
      return <option key={tech}>{tech}</option>;
    });

    return (
      <div>
        <span>
          <strong>Techstack: </strong>
        </span>
        <select name="techstack" id="techstack" onChange={this.handleChange}>
          <option>All</option>
          {listTechs}
        </select>
        <div>{display}</div>
      </div>
    );
  }
}

export default SearchTechStack;
