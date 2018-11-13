import React, { Component } from "react";
import { getProject } from "../data_projects";
import { getTechstack } from "../data_techstacks";

class SearchTechStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: getProject(),
      techstack: getTechstack(),
      value: "techstack"
    };

    this.handleChange = this.handleChange.bind(this);
    this.getProjectByTechStack = this.getProjectByTechStack.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toLowerCase() });
  }

  getProjectByTechStack(techstack) {
    return techstack !== "techstack"
      ? this.state.project.filter(project =>
          project.techstack.find(item => item === techstack)
        )
      : this.state.project;
  }

  render() {
    const filteredData = this.getProjectByTechStack(this.state.value);

    const display = filteredData.map(project => {
      return <h1>Project: {project.name}</h1>;
    });

    const listTechs = this.state.techstack.map(tech => {
      return <option>{tech}</option>;
    });

    return (
      <div>
        <select name="techstack" id="techstack" onChange={this.handleChange}>
          <option>Select</option>
          {listTechs}
        </select>
        {display}
      </div>
    );
  }
}

export default SearchTechStack;
