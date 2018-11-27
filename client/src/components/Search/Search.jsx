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

  getFilteredOptions(filters, projects) {
    return filters.reduce((acc, filter) => {
      acc[filter] = getFilteredProperties( projects, this.searchOptionSettings[filter].searchFieldName);
      return acc;
    }, {});
  }

  async componentDidMount() {
    const filters = ["nda", "client", "region", "office", "industry", "year", "project"]
    const projects = await getProjects();
    console.log(this.getFilteredOptions(filters, projects))
    this.setState({
      project: projects,
      filterOptions: {
        ...this.getFilteredOptions(filters, projects),
        techstack: getFilteredMultiProperties(
          projects,
          this.searchOptionSettings["techstack"].searchFieldName
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
      selectIsMulti: true,
      searchFieldName: "region",
      displayName: "Region",
      openMenuOnClick: true,
      components: {}
    },
    office: {
      selectIsMulti: true,
      searchFieldName: "office",
      displayName: "Office",
      openMenuOnClick: true,
      components: {}
    },
    year: {
      selectIsMulti: true,
      searchFieldName: "year",
      displayName: "Year",
      openMenuOnClick: true,
      components: {}
    },
    nda: {
      selectIsMulti: true,
      searchFieldName: "nda",
      displayName: "NDA Status",
      openMenuOnClick: true,
      components: {}
    },
    industry: {
      selectIsMulti: true,
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
              const matchingProjects = filterList.filter(project => {
                const projectAttribute =
                  project[this.searchOptionSettings[key].searchFieldName];
                if (Array.isArray(projectAttribute)) {
                  return projectAttribute.find(
                    item => item.toLowerCase() === option.value.toLowerCase()
                  );
                } else {
                  return projectAttribute === option.value;
                }
              });
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
    this.setState({ resultList: results });
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
    const filters = ["nda", "client", "region", "office", "industry", "year", "project"]
    this.setState({
      resultList: this.state.project,
      filterOptions: {
        ...this.getFilteredOptions(filters, this.state.project),
        techstack: getFilteredMultiProperties(
          this.state.project,
          this.searchOptionSettings["techstack"].searchFieldName
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
