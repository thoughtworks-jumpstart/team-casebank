import React, { Component } from "react";
import SearchResults from "./SearchResults";
import SearchCriteria from "./SearchCriteria";
import Media from "./Media";
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

  getFilteredOptions = (filters, projects) => {
    return filters.reduce((acc, filter) => {
      acc[filter] = getFilteredProperties(
        projects,
        this.searchOptionSettings[filter].searchFieldName
      );
      return acc;
    }, {});
  };

  async componentDidMount() {
    const filters = [
      "nda",
      "client",
      "region",
      "office",
      "industry",
      "year",
      "project"
    ];
    const projects = await getProjects();
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

  //Compare Numbers or Strings case insensitive
  isEqualValue = (firstValue, secondValue) => {
    console.log(firstValue, secondValue);
    if (firstValue instanceof String || typeof firstValue === "string") {
      return firstValue.toLowerCase() === secondValue.toLowerCase();
    } else if (firstValue === null && secondValue === "Unknown") {
      return true;
    } else {
      return firstValue === secondValue;
    }
  };

  findMatchingProjects = (dropDown, optionValue) => {
    const { project } = this.state;
    let allProjects = [...project];

    return allProjects.filter(project => {
      //make all project attributes into an array
      const attributeName = this.searchOptionSettings[dropDown].searchFieldName;
      const attribute = Array.isArray(project[attributeName])
        ? project[attributeName]
        : [project[attributeName]];
      if (!attribute.length && optionValue === "Unknown") {
        return true;
      } else {
        return (
          attribute.findIndex(item => this.isEqualValue(item, optionValue)) > -1
        );
      }
    });
  };

  getFilteredResults = () => {
    const { selectedSearch } = this.state;
    //a copy of all projects
    const allDropdownEmpty =
      Object.values(selectedSearch).flatMap(x => x).length === 0;

    if (allDropdownEmpty) {
      const { project } = this.state;
      let allProjects = [...project];
      return allProjects;
    }
    return Object.entries(selectedSearch).flatMap(([dropDown, values]) => {
      const valuesArray = Array.isArray(values) ? values : [values];
      return valuesArray.flatMap(option => {
        //find matching project
        return this.findMatchingProjects(dropDown, option.value);
      });
    });
  };

  handleSelectOption = () => {
    const uniqueResults = [...new Set(this.getFilteredResults())];
    this.setState({ resultList: uniqueResults });
  };

  //Triggered when user selects option in dropdown
  handleChange = (selectedOption, selectedLabel) => {
    //save previous selected options for all dropdowns
    let previousSelected = this.state.selectedSearch;
    //update the the dropdown triggered with new value
    //if is array
    if (Array.isArray(selectedOption)) {
      previousSelected[selectedLabel] = selectedOption;
    } else if (selectedOption === null) {
      previousSelected[selectedLabel] = [];
    } else {
      previousSelected[selectedLabel] = [selectedOption];
    }

    //if null
    //save updated selections to state
    this.setState({ selectedSearch: previousSelected });
    this.handleSelectOption();
  };

  clearFilter = () => {
    const filters = [
      "nda",
      "client",
      "region",
      "office",
      "industry",
      "year",
      "project"
    ];
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
          <Media />
          <h4>Filter by</h4>
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
          <h4>Case studies</h4>
          <SearchResults resultList={resultList} />
        </div>
      </div>
    );
  }
}
