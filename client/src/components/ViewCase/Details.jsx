import { getProjectById } from "../../data/projectService";
import React, { Component } from "react";
import CaseProperties from "./CaseProperties";
import CaseDetails from "./CaseDetails";
import Title from "./Title";

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    let project = await getProjectById(this.props.id)
    this.setState({ project });
  }

  render() {
    if (this.state.project) {
      let properties = this.state.project;
      let title = { client: properties.client, name: properties.name };
      return (
        <div className="container-fluid p-4">
          <div className="row text-center">
            <div className="col">
              <Title properties={title} />
            </div>
          </div>
          <div className="row m-4">
            <div className="col-3 pl-4">
              <CaseProperties properties={properties} />
            </div>
            <div className="col-9">
              <CaseDetails description={properties.description} />
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}
