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
      selectedValue,
      openMenuOnClick,
      components
    } = this.props;

    const valueArrayOfObjects = searchOptions.map(element => ({
      value: element,
      label: element
    }));
    return (
      <div className="mb-3">
        <h6>
          <div className="dropdown-label">{textLabel}</div>
        </h6>
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
          openMenuOnClick={openMenuOnClick}
          components={components}
        />
      </div>
    );
  }
}
