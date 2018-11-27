import React, { Component } from "react";
import Editor from "./Editor";
import ProjectAttributes from "./ProjectAttributes";
import Title from "./Title";
import getProjectAttributes from "../../data/attributeService";
import { getUsers } from "../../data/userService";
import { createProject } from "../../data/projectService";
import { Redirect } from "react-router-dom";
export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: {
        Region: null,
        Techstack: [],
        Office: null,
        Industry: null,
        nda: null,
        Client: null,
        Team: []
      },
      name: "",
      attributes: [],
      content: "Enter project details here"
    };
    this.onChangeHTML = this.onChangeHTML.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.submitProject = this.submitProject.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  onChangeHTML(content) {
    this.setState({ content });
  }

  async componentDidMount() {
    const attributes = await getProjectAttributes();
    const users = await getUsers();
    const userList = users.map(user => {
      return { value: user._id, label: user.name };
    });
    const tw_contact = { attribute: "Main TW Contact", list: userList };
    const team = { attribute: "Team", list: userList };
    attributes.push(tw_contact);
    attributes.push(team);
    this.setState({ attributes });
  }

  updateAttributes(options, attribute) {
    let selectedOptions = { ...this.state.selectedOptions };
    selectedOptions[attribute] = options;
    if (selectedOptions.Region !== this.state.selectedOptions.Region) {
      selectedOptions.Office = null;
    }
    this.setState({ selectedOptions });
  }
  createOption(option) {}

  saveName(e) {
    this.setState({ name: e.target.value });
  }
  async submitProject() {
    let values = { ...this.state.selectedOptions };
    let project = {
      name: this.state.name ? this.state.name : null,
      client: values.Client ? values.Client.value : null,
      region: values.Region ? values.Region.value : null,
      techstack: values.Techstack ? values.Techstack.map(e => e.value) : null,
      office: values.Office ? values.Office.value : null,
      industry: values.Industry ? values.Industry.value : null,
      nda: values.nda ? values.nda.value : null,
      members: values.Team ? values.Team.map(e => e.value) : null,
      main_tw_contact: values["Main TW Contact"]
        ? values["Main TW Contact"].value
        : null,
      year: values.Year ? parseInt(values.Year.value) : null,
      description: this.state.content
    };
    let response = await createProject(project);
    if (response) {
      this.setState({ created: true });
    }
  }

  render() {
    let attributes = this.state.attributes;
    if (this.state.created) {
      return <Redirect to="/search" />;
    }
    return attributes.length ? (
      <div className="container-fluid p-4">
        <div className="row text-center">
          <div className="col">
            <Title
              clients={
                this.state.attributes.filter(a => a.attribute === "Client")[0]
              }
              selected={this.state.selectedOptions.Client}
              onChange={this.updateAttributes}
              submit={this.submitProject}
              name={this.state.name}
              saveName={this.saveName}
            />
          </div>
        </div>
        <div className="row m-4">
          <div className="col-3 pl-4">
            <ProjectAttributes
              onChange={this.updateAttributes}
              attributes={attributes}
              selected={this.state.selectedOptions}
              region={this.state.selectedOptions.Region}
            />
          </div>
          <div className="col-9">
            <Editor
              onChangeHTML={this.onChangeHTML}
              value={this.state.content}
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}
