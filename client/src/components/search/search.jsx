import React, { Component } from "react";
import SearchOptions from "./SearchOptions";
import SearchResults from "./SearchResults";
import { getProjects } from "../../data/projectService";

export default class Search extends Component {
  state = {
    project: [],
    resultList: [],
    selectedOptions: "All"
  };

  componentDidMount() {
    const projects = getProjects();
    this.setState({ project: projects, resultList: projects });
  }

  handleSelectOption = option => {
    console.log("In handle select", option);
    if (option !== "All") {
      const filtered = this.state.project.filter(project =>
        project.techstack.find(item => item === option.toLowerCase())
      );
      this.setState({ resultList: filtered });
    } else {
      this.setState({ resultList: this.state.project });
    }

    this.setState({ selectedOptions: option });
  };

  render() {
    const { selectedOptions, resultList } = this.state;
    return (
      <div className="row">
        <div className="col-2 ml-4">
          <SearchOptions
            onClick={this.handleSelectOption}
            selectedOptions={selectedOptions}
          />
        </div>
        <div className="col mr-4">
          <SearchResults resultList={resultList} />
        </div>
      </div>
    );
  }
}
