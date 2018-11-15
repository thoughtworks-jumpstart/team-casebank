import React, { Component } from "react";
import Select from "react-select";

export default class SearchCriteria extends Component {
  render() {
    const officesArrayOfStrings = this.props.getOffices();

    const officesArrayOfObjects = officesArrayOfStrings.map(element => ({
      value: element,
      label: element
    }));
    return (
      <div>
        <Select
          // defaultValue={[colourOptions[2], colourOptions[3]]}
          isMulti
          name="offices"
          options={officesArrayOfObjects}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    );
  }
}
