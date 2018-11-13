import { getProject } from "../../data_projects";
import React, { Component } from "react";
import CaseProperties from "./CaseProperties";
import CaseDetails from "./CaseDetails";
import Title from "./Title";

export default class Details extends Component {
  componentDidMount() {}
  render() {
    let properties = { ...getProject()[0] };
    let description = { ...properties };
    let title = { client: description.client, name: description.name };
    delete properties.description;
    delete properties._id;
    delete properties.client;
    delete properties.name;
    return (
      <div className="container">
        <div className="row text-center">
          <div className="col p-4">
            <Title properties={title} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <CaseProperties properties={properties} />
          </div>
          <div className="col-9">
            <CaseDetails description={description.description} />
          </div>
        </div>
      </div>
    );
  }
}
