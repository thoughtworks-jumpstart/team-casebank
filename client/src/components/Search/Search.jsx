import React, { Component } from "react";
import SearchResults from "./SearchResults";
import SearchCriteria from "./SearchCriteria";
import { getProjects } from "../../data/projectService";
import { getRegions } from "../../data/regionService";
import { getOffices } from "../../data/officeService";
import { getStatus } from "../../data/statusService";
import { getTechstack } from "../../data/techStackService";

export default class Search extends Component {
  state = {
    project: [],
    resultList: [],
    selectedOptions: "All",
    selectedSearch: {
      region: [],
      office: [],
      status: [],
      techstack: []
    }
  };

  componentDidMount() {
    const projects = getProjects();
    this.setState({ project: projects, resultList: projects });
  }

  searchOptionSettings = {
    region: {
      searchOptions: getRegions,
      selectIsMulti: false
    },
    office: {
      searchOptions: getOffices,
      selectIsMulti: false
    },
    status: {
      searchOptions: getStatus,
      selectIsMulti: false
    },
    techstack: {
      searchOptions: getTechstack,
      selectIsMulti: true
    }
  };

  handleSelectOption = () => {
    let filterList = [...this.state.project];
    for (let key in this.state.selectedSearch) {
      if (this.state.selectedSearch[key] !== []) {
        const options = this.state.selectedSearch[key];
        if (options) {
          if (this.searchOptionSettings[key].selectIsMulti) {
            for (let option of options) {
              console.log(`option is ${option.value}`);
              console.log(`key is ${key}`);
              filterList = filterList.filter(project =>
                project[key].find(
                  item => item.toLowerCase() === option.value.toLowerCase()
                )
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
    const { resultList } = this.state;
    return (
      <div className="row">
        <div className="col-2 ml-4">
          {Object.keys(this.searchOptionSettings).map((key, index) => (
            <SearchCriteria
              key={index}
              searchOptions={this.searchOptionSettings[key].searchOptions()}
              searchLabel={key}
              handleChange={this.handleChange}
              isMulti={this.searchOptionSettings[key].selectIsMulti}
            />
          ))}
        </div>
        <div className="col mr-4">
          <SearchResults resultList={resultList} />
        </div>
      </div>
    );
  }
}
