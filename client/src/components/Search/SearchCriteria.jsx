import React, { Component } from "react";
import Select from "react-select";

export default class SearchCriteria extends Component {
  render() {
    const { searchLabel, searchOptions, isMulti, selectedValue } = this.props;

    const valueArrayOfObjects = searchOptions.map(element => ({
      value: element,
      label: element
    }));
    return (
      <div>
        <h4>
          <div className="badge badge-secondary">
            {searchLabel.charAt(0).toUpperCase() + searchLabel.slice(1)}
          </div>
        </h4>
        <Select
          isMulti={isMulti}
          isClearable={true}
          name={searchLabel}
          options={valueArrayOfObjects}
          onChange={selectedOptions =>
            this.props.handleChange(selectedOptions, searchLabel)
          }
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedValue}
        />
      </div>
    );
  }
}
