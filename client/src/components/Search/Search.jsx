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
    client: {
      selectIsMulti: false,
      searchFieldName: "client",
      displayName: "Client",
      openMenuOnClick: false,
      components: {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }
    },
    project: {
      selectIsMulti: false,
      searchFieldName: "name",
      displayName: "Project",
      openMenuOnClick: false,
      components: {
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }
    },
    region: {
      selectIsMulti: false,
      searchFieldName: "region",
      displayName: "Region",
      openMenuOnClick: true,
      components: {}
    },
    office: {
      selectIsMulti: false,
      searchFieldName: "office",
      displayName: "Office",
      openMenuOnClick: true,
      components: {}
    },
    year: {
      selectIsMulti: false,
      searchFieldName: "year",
      displayName: "Year",
      openMenuOnClick: true,
      components: {}
    },
    nda: {
      selectIsMulti: false,
      searchFieldName: "nda",
      displayName: "NDA Status",
      openMenuOnClick: true,
      components: {}
    },
    industry: {
      selectIsMulti: false,
      searchFieldName: "industry",
      displayName: "Industry",
      openMenuOnClick: true,
      components: {}
    },
    techstack: {
      selectIsMulti: true,
      searchFieldName: "techstack",
      displayName: "Tech Stack",
      openMenuOnClick: true,
      components: {}
    }
  };

  handleSelectOption = () => {
    //a copy of all projects
    let filterList = [...this.state.project];
    let results = [];
    //loop through all dropdowns
    for (let key in this.state.selectedSearch) {
      //if dropdown has a selected option
      if (this.state.selectedSearch[key] !== []) {
        //get the selected options from dropdown
        const options = this.state.selectedSearch[key];
        if (options) {
          //if dropdown is a multiselect
          if (this.searchOptionSettings[key].selectIsMulti) {
            //loop through selected options in dropdown
            for (let option of options) {
              console.log(`option is ${option.value}`);
              console.log(`key is ${key}`);
              //get projects which attribute matches selected option
              const matchingProjects = filterList.filter(project =>
                project[this.searchOptionSettings[key].searchFieldName].find(
                  item => item.toLowerCase() === option.value.toLowerCase()
                )
              );
              results = [...new Set([...results, ...matchingProjects])];
            }
          } else {
            console.log(`option non multi is ${options.value}`);
            console.log(`key non multi is ${key}`);
            if (options.value) {
              //get projects which attribute matches selected option
              const matchingProjects = filterList.filter(
                project =>
                  project[this.searchOptionSettings[key].searchFieldName] ===
                  options.value
              );
              results = [...new Set([...results, ...matchingProjects])];
            }
          }
        }
      }
    }
    this.setState({resultList: results});
  };

  //Triggered when user selects option in dropdown
  handleChange = (selectedOption, selectedLabel) => {
    //save previous selected options for all dropdowns
    let previousSelected = this.state.selectedSearch;
    //update the the dropdown triggered with new value
    previousSelected[selectedLabel] = selectedOption;
    //save updated selections to state
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
      <div className="row mt-4">
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
              openMenuOnClick={this.searchOptionSettings[key].openMenuOnClick}
              components={this.searchOptionSettings[key].components}
            />
          ))}
          <button
            onClick={this.clearFilter}
            type="button"
            className="btn btn-secondary mt-2"
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
