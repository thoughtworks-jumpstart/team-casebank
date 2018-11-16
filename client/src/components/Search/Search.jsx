import React, { Component } from "react";
import SearchOptions from "./SearchOptions";
import SearchResults from "./SearchResults";
import SearchCriteria from "./SearchCriteria";
import { getProjects } from "../../data/projectService";
import { getOffices } from "../../data/officeService";
import { getStatus } from "../../data/statusService";

export default class Search extends Component {
  state = {
    project: [],
    resultList: [],
    selectedOptions: "All",
    selectedSearch: {
      office: [],
      status: []
    },
    selectIsMulti: {
      office: false,
      status: false
    }
  };

  componentDidMount() {
    const projects = getProjects();
    this.setState({ project: projects, resultList: projects });
  }

  // handleSelectOption = option => {
  //   if (option !== "All") {
  //     const filtered = this.state.project.filter(project =>
  //       project.techstack.find(
  //         item => item.toLowerCase() === option.toLowerCase()
  //       )
  //     );
  //     this.setState({ resultList: filtered });
  //   } else {
  //     this.setState({ resultList: this.state.project });
  //   }

  //   this.setState({ selectedOptions: option });
  // };

  handleSelectOption = () => {
    let filterList = [...this.state.project];
    for (let key in this.state.selectedSearch) {
      if (this.state.selectedSearch[key] !== []) {
        const options = this.state.selectedSearch[key];
        if (options) {
          if (this.state.selectIsMulti[key]) {
            for (let option of options) {
              console.log(`option is ${option.value}`);
              console.log(`key is ${key}`);
              filterList = filterList.filter(
                project => project[key] === option.value
              );
            }
          } else {
            console.log(`option non multi is ${options.value}`);
            console.log(`key non multi is ${key}`);
            if (options.value) {
              filterList = filterList.filter(
                project => project[key] === options.value
              );
            }
          }
        }
      }
    }
    this.setState({ resultList: filterList });
  };

  handleChange = (selectedOption, selectedLabel) => {
    let previousSelected = this.state.selectedSearch;
    previousSelected[selectedLabel] = selectedOption;
    this.setState({ selectedSearch: previousSelected });
    console.log(`Option selected:`, selectedOption);
    console.log(`label selected:`, selectedLabel);
    this.handleSelectOption();
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
          <SearchCriteria
            searchOptions={getOffices()}
            searchLabel={"office"}
            handleChange={this.handleChange}
            isMulti={this.state.selectIsMulti["office"]}
          />
          <SearchCriteria
            searchOptions={getStatus()}
            searchLabel={"status"}
            handleChange={this.handleChange}
            isMulti={this.state.selectIsMulti["status"]}
          />
          {this.state.selectedSearch["office"][1] && (
            <p>
              current selected: {this.state.selectedSearch["office"][1].label}
            </p>
          )}
        </div>
        <div className="col mr-4">
          <SearchResults resultList={resultList} />
        </div>
      </div>
    );
  }
}
