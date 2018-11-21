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
      nda: [],
      client: [],
      region: [],
      office: [],
      industry: [],
      techstack: [],
      year: [],
      project: []
    },
    selectedSearch: {
      nda: [],
      client: [],
      region: [],
      office: [],
      industry: [],
      techstack: [],
      year: [],
      project: []
    }
  };

  async componentDidMount() {
    const projects = await getProjects();
    this.setState({
      project: projects,
      filterOptions: {
        nda: getFilteredProperties(
          projects,
          this.searchOptionSettings["nda"].searchFieldName
        ),
        client: getFilteredProperties(
          projects,
          this.searchOptionSettings["client"].searchFieldName
        ),
        region: getFilteredProperties(
          projects,
          this.searchOptionSettings["region"].searchFieldName
        ),
        office: getFilteredProperties(
          projects,
          this.searchOptionSettings["office"].searchFieldName
        ),
        industry: getFilteredProperties(
          projects,
          this.searchOptionSettings["industry"].searchFieldName
        ),
        techstack: getFilteredMultiProperties(
          projects,
          this.searchOptionSettings["techstack"].searchFieldName
        ),
        year: getFilteredProperties(
          projects,
          this.searchOptionSettings["year"].searchFieldName
        ),
        project: getFilteredProperties(
          projects,
          this.searchOptionSettings["project"].searchFieldName
        )
      },
      resultList: projects
    });
  }

  searchOptionSettings = {
    nda: {
      selectIsMulti: false,
      searchFieldName: "nda",
      displayName: "NDA status"
    },
    client: {
      selectIsMulti: false,
      searchFieldName: "client",
      displayName: "Client"
    },
    project: {
      selectIsMulti: false,
      searchFieldName: "name",
      displayName: "Project"
    },
    region: {
      selectIsMulti: false,
      searchFieldName: "region",
      displayName: "Region"
    },
    office: {
      selectIsMulti: false,
      searchFieldName: "office",
      displayName: "Office"
    },
    year: {
      selectIsMulti: false,
      searchFieldName: "year",
      displayName: "Year"
    },
    industry: {
      selectIsMulti: false,
      searchFieldName: "industry",
      displayName: "Industry"
    },
    techstack: {
      selectIsMulti: true,
      searchFieldName: "techstack",
      displayName: "Tech stack"
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
        nda: getFilteredProperties(
          filterList,
          this.searchOptionSettings["nda"].searchFieldName
        ),
        client: getFilteredProperties(
          filterList,
          this.searchOptionSettings["client"].searchFieldName
        ),
        region: getFilteredProperties(
          filterList,
          this.searchOptionSettings["region"].searchFieldName
        ),
        office: getFilteredProperties(
          filterList,
          this.searchOptionSettings["office"].searchFieldName
        ),
        industry: getFilteredProperties(
          filterList,
          this.searchOptionSettings["industry"].searchFieldName
        ),
        techstack: getFilteredMultiProperties(
          filterList,
          this.searchOptionSettings["techstack"].searchFieldName
        ),
        year: getFilteredProperties(
          filterList,
          this.searchOptionSettings["year"].searchFieldName
        ),
        project: getFilteredProperties(
          filterList,
          this.searchOptionSettings["project"].searchFieldName
        )
      }
    });
  };

  handleChange = (selectedOption, selectedLabel) => {
    let previousSelected = this.state.selectedSearch;
    previousSelected[selectedLabel] = selectedOption;
    this.setState({ selectedSearch: previousSelected });
    this.handleSelectOption();
  };

  clearFilter = () => {
    this.setState({
      resultList: this.state.project,
      filterOptions: {
        nda: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["nda"].searchFieldName
        ),
        client: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["client"].searchFieldName
        ),
        region: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["region"].searchFieldName
        ),
        office: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["office"].searchFieldName
        ),
        industry: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["industry"].searchFieldName
        ),
        techstack: getFilteredMultiProperties(
          this.state.project,
          this.searchOptionSettings["techstack"].searchFieldName
        ),
        year: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["year"].searchFieldName
        ),
        project: getFilteredProperties(
          this.state.project,
          this.searchOptionSettings["project"].searchFieldName
        )
      },
      selectedSearch: {
        nda: [],
        client: [],
        region: [],
        office: [],
        industry: [],
        techstack: [],
        year: [],
        project: []
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
              selectId={`${key}-dropdown`}
              key={index}
              searchOptions={this.state.filterOptions[key]}
              textLabel={this.searchOptionSettings[key].displayName}
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
