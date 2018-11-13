import { getProject } from "../../data_projects";
import React, { Component } from "react";
import CaseProperties from "./CaseProperties";
import CaseDetails from "./CaseDetails";

export default class Case extends Component {
  componentDidMount() {}
  render() {
    let properties = { ...getProject() };
    delete properties.description;
    return (
      <div>
        <CaseProperties properties={properties} />
        <CaseDetails description={properties.description} />
      </div>
    );
  }
}
