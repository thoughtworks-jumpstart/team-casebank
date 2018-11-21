import React, { Component } from "react";
import Select from "react-select";

export default class SearchCriteria extends Component {
  render() {
    const {
      selectId,
      textLabel,
      searchLabel,
      searchOptions,
      isMulti,
      selectedValue
    } = this.props;

    const valueArrayOfObjects = searchOptions.map(element => ({
      value: element,
      label: element
    }));
    return (
      <div>
        <h4>
          <div className="badge badge-secondary dropdown-label">{textLabel}</div>
        </h4>
        <Select
          id={selectId}
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
          placeholder="All"
        />
      </div>
    );
  }
}
