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
      tags: []
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
      tags: []
    }
  };

  async componentDidMount() {
    const projects = await getProjects();
    this.setState({
      project: projects,
      filterOptions: {
        client: getFilteredProperties(projects, this.searchOptionSettings["client"].searchFieldName),
        region: getFilteredProperties(projects, this.searchOptionSettings["region"].searchFieldName),
        office: getFilteredProperties(projects, this.searchOptionSettings["office"].searchFieldName),
        status: getFilteredProperties(projects, this.searchOptionSettings["status"].searchFieldName),
        industry: getFilteredProperties(projects, this.searchOptionSettings["industry"].searchFieldName),
        techstack: getFilteredMultiProperties(projects, this.searchOptionSettings["techstack"].searchFieldName),
        year: getFilteredProperties(projects, this.searchOptionSettings["year"].searchFieldName),
        project: getFilteredProperties(
          projects,
          this.searchOptionSettings["project"].searchFieldName
        ),
        tags: getFilteredMultiProperties(projects, this.searchOptionSettings["tags"].searchFieldName)
      },
      resultList: projects
    });
  }

  searchOptionSettings = {
    client: {
      selectIsMulti: false,
      searchFieldName: "client"
    },
    project: {
      selectIsMulti: false,
      searchFieldName: "name"
    },
    region: {
      selectIsMulti: false,
      searchFieldName: "region"
    },
    office: {
      selectIsMulti: false,
      searchFieldName: "office"
    },
    year: {
      selectIsMulti: false,
      searchFieldName: "year"
    },
    status: {
      selectIsMulti: false,
      searchFieldName: "status"
    },
    industry: {
      selectIsMulti: false,
      searchFieldName: "industry"
    },
    tags: {
      selectIsMulti: true,
      searchFieldName: "tag"
    },
    techstack: {
      selectIsMulti: true,
      searchFieldName: "techstack"
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
                project[this.searchOptionSettings[key].searchFieldName].find(
                  item => item.toLowerCase() === option.value.toLowerCase()
                )
              );
            }
          } else {
            console.log(`option non multi is ${options.value}`);
            console.log(`key non multi is ${key}`);
            if (options.value) {
              filterList = filterList.filter(
                project =>
                  project[this.searchOptionSettings[key].searchFieldName] ===
                  options.value
              );
            }
          }
        }
      }
    }
    this.setState({
      resultList: filterList,
      filterOptions: {
        client: getFilteredProperties(filterList, this.searchOptionSettings["client"].searchFieldName),
        region: getFilteredProperties(filterList, this.searchOptionSettings["region"].searchFieldName),
        office: getFilteredProperties(filterList, this.searchOptionSettings["office"].searchFieldName),
        status: getFilteredProperties(filterList, this.searchOptionSettings["status"].searchFieldName),
        industry: getFilteredProperties(filterList, this.searchOptionSettings["industry"].searchFieldName),
        techstack: getFilteredMultiProperties(filterList, this.searchOptionSettings["techstack"].searchFieldName),
        year: getFilteredProperties(filterList, this.searchOptionSettings["year"].searchFieldName),
        project: getFilteredProperties(
          filterList,
          this.searchOptionSettings["project"].searchFieldName
        ),
        tags: getFilteredMultiProperties(filterList, this.searchOptionSettings["tags"].searchFieldName)
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
        client: getFilteredProperties(this.state.project, this.searchOptionSettings["client"].searchFieldName),
        region: getFilteredProperties(this.state.project, this.searchOptionSettings["region"].searchFieldName),
        office: getFilteredProperties(this.state.project, this.searchOptionSettings["office"].searchFieldName),
        status: getFilteredProperties(this.state.project, this.searchOptionSettings["status"].searchFieldName),
        industry: getFilteredProperties(this.state.project, this.searchOptionSettings["industry"].searchFieldName),
        techstack: getFilteredMultiProperties(this.state.project, this.searchOptionSettings["techstack"].searchFieldName),
        year: getFilteredProperties(this.state.project, this.searchOptionSettings["year"].searchFieldName),
        project: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["project"].searchFieldName
        ),
        tags: getFilteredMultiProperties(this.state.project, this.searchOptionSettings["tags"].searchFieldName)
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
        tags: []
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
