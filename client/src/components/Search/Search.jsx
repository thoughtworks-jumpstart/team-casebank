import React, { Component } from "react";
import SearchResults from "./SearchResults";
import SearchCriteria from "./SearchCriteria";
import { getProjects } from "../../data/projectService";
import {
  getFilteredProperties,
  getFilteredMultiProperties
} from "../../data/propertyService";

export default class Search extends Component {
  state = {
    project: [],
    resultList: [],
    selectedOptions: "All",
    filterOptions: {
      client: [],
      region: [],
      office: [],
      status: [],
      industry: [],
      techstack: [],
      year: [],
      project: [],
      tag: []
    },
    selectedSearch: {
      client: [],
      region: [],
      office: [],
      status: [],
      industry: [],
      techstack: [],
      year: [],
      project: [],
      tag: []
    }
  };

  async componentDidMount() {
    const projects = await getProjects();
    this.setState({
      project: projects,
      filterOptions: {
        client: getFilteredProperties(projects, "client"),
        region: getFilteredProperties(projects, "region"),
        office: getFilteredProperties(projects, "office"),
        status: getFilteredProperties(projects, "status"),
        industry: getFilteredProperties(projects, "industry"),
        techstack: getFilteredMultiProperties(projects, "techstack"),
        year: getFilteredProperties(projects, "year"),
        project: getFilteredProperties(projects, "project"),
        tag: getFilteredMultiProperties(projects, "tag")
      },
      resultList: projects
    });
  }

  searchOptionSettings = {
    client: {
      selectIsMulti: false
    },
    region: {
      selectIsMulti: false
    },
    office: {
      selectIsMulti: false
    },
    status: {
      selectIsMulti: false
    },
    industry: {
      selectIsMulti: false
    },
    techstack: {
      selectIsMulti: true
    },
    year: {
      selectIsMulti: false
    },
    project: {
      selectIsMulti: false
    },
    tag: {
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
    this.setState({
      resultList: filterList,
      filterOptions: {
        client: getFilteredProperties(filterList, "client"),
        region: getFilteredProperties(filterList, "region"),
        office: getFilteredProperties(filterList, "office"),
        status: getFilteredProperties(filterList, "status"),
        industry: getFilteredProperties(filterList, "industry"),
        techstack: getFilteredMultiProperties(filterList, "techstack"),
        year: getFilteredProperties(filterList, "year"),
        project: getFilteredProperties(filterList, "project"),
        tag: getFilteredMultiProperties(filterList, "tag")
      }
    });
  };

  handleChange = (selectedOption, selectedLabel) => {
    let previousSelected = this.state.selectedSearch;
    previousSelected[selectedLabel] = selectedOption;
    this.setState({ selectedSearch: previousSelected });
    console.log(`Option selected:`, selectedOption);
    console.log(`label selected:`, selectedLabel);
    this.handleSelectOption();
  };

  clearFilter = () => {
    this.setState({
      resultList: this.state.project,
      filterOptions: {
        client: getFilteredProperties(this.state.project, "client"),
        region: getFilteredProperties(this.state.project, "region"),
        office: getFilteredProperties(this.state.project, "office"),
        status: getFilteredProperties(this.state.project, "status"),
        industry: getFilteredProperties(this.state.project, "industry"),
        techstack: getFilteredMultiProperties(this.state.project, "techstack"),
        year: getFilteredProperties(this.state.project, "year"),
        project: getFilteredProperties(this.state.project, "project"),
        tag: getFilteredMultiProperties(this.state.project, "tag")
      },
      selectedSearch: {
        client: [],
        region: [],
        office: [],
        status: [],
        industry: [],
        techstack: [],
        year: [],
        project: [],
        tag: []
      }
    });
  };

  render() {
    const { resultList } = this.state;
    return (
      <div className="row">
        <div className="col-2 ml-4">
          {Object.keys(this.searchOptionSettings).map((key, index) => (
            <SearchCriteria
              key={index}
              searchOptions={this.state.filterOptions[key]}
              // searchOptions={this.searchOptionSettings[key].searchOptions()}
              searchLabel={key}
              handleChange={this.handleChange}
              isMulti={this.searchOptionSettings[key].selectIsMulti}
              selectedValue={this.state.selectedSearch[key]}
            />
          ))}
          <br />
          <br />
          <br />
          <br />
          <button
            onClick={this.clearFilter}
            type="button"
            className="btn btn-secondary"
          >
            Clear All
          </button>
        </div>

        <div className="col mr-4">
          <SearchResults resultList={resultList} />
        </div>
      </div>
    );
  }
}
