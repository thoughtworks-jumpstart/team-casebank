import React, { Component } from "react";
import Editor from "./Editor";
import ProjectAttributes from "./ProjectAttributes";
import Title from "./Title";
import { getAttributes, create } from "../../data/attributeService";
import { getUsers } from "../../data/userService";
import {
  createProject,
  getProjectById,
  updateProject
} from "../../data/projectService";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../UserDetails/AuthContext";
export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      attributes: [],
      content: "Enter project details here"
    };
    this.onChangeHTML = this.onChangeHTML.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
    this.submitProject = this.submitProject.bind(this);
    this.saveName = this.saveName.bind(this);
    this.createOption = this.createOption.bind(this);
  }

  onChangeHTML(content) {
    this.setState({ content });
  }

  async componentDidMount() {
    let content;
    let selectedOptions = { Team: [], Techstack: [] };
    let project;
    if (this.props.id) {
      project = await getProjectById(this.props.id);
      content = project.description;
      for (let key in project) {
        if (!project[key]) {
          delete project[key];
        }
      }
      for (let key in project) {
        switch (key) {
          case "techstack":
            for (let tech of project.techstack) {
              selectedOptions["Techstack"].push({
                value: tech,
                label: tech
              });
            }
            break;
          case "members":
            for (let member of project.members) {
              selectedOptions["Team"].push({
                id: member._id,
                value: member.name,
                label: member.name
              });
            }
            break;
          case "main_tw_contact":
            selectedOptions["Main TW Contact"] = {
              id: project[key]._id,
              value: project[key].name,
              label: project[key].name
            };
            break;
          case "year":
            selectedOptions["Year"] = {
              value: project[key],
              label: project[key]
            };
            break;
          case "industry":
            selectedOptions["Industry"] = {
              value: project[key],
              label: project[key]
            };
            break;
          case "client":
            selectedOptions["Client"] = {
              value: project[key],
              label: project[key]
            };
            break;
          case "region":
            selectedOptions["Region"] = {
              value: project[key],
              label: project[key]
            };
            break;
          case "office":
            selectedOptions["Office"] = {
              value: project[key],
              label: project[key]
            };
            break;
          case "nda":
            selectedOptions["NDA Status"] = {
              value: project[key],
              label: project[key]
            };
            break;
        }
      }
    }
    const attributes = await getAttributes();
    const users = await getUsers();
    const userList = users.map(user => {
      return { id: user._id, value: user.name, label: user.name };
    });
    const tw_contact = { attribute: "Main TW Contact", list: userList };
    const team = { attribute: "Team", list: userList };
    attributes.push(tw_contact);
    attributes.push(team);
    this.setState({
      attributes,
      selectedOptions,
      content,
      name: project ? project.name : null
    });
  }

  updateAttributes(options, attribute) {
    let selectedOptions = { ...this.state.selectedOptions };
    selectedOptions[attribute] = options;
    if (selectedOptions.Region !== this.state.selectedOptions.Region) {
      selectedOptions.Office = null;
    }
    this.setState({ selectedOptions });
  }
  async createOption(option, attribute) {
    await create(option, attribute);
    this.updateAttributes({ value: option, label: option }, attribute);
    let temp = [...this.state.attributes];
    temp[temp.findIndex(e => e.attribute === attribute)].list.push(option);
    this.setState({ attributes: temp });
  }

  saveName(e) {
    this.setState({ name: e.target.value });
  }
  async submitProject() {
    let values = { ...this.state.selectedOptions };
    if (this.state.name && values.Client) {
      let project = {
        name: this.state.name,
        client: values.Client.value,
        region: values.Region ? values.Region.value : null,
        techstack: values.Techstack ? values.Techstack.map(e => e.value) : null,
        office: values.Office ? values.Office.value : null,
        industry: values.Industry ? values.Industry.value : null,
        nda: values["NDA Status"] ? values["NDA Status"].value : null,
        members: values.Team ? values.Team.map(e => e.id) : [],
        main_tw_contact: values["Main TW Contact"]
          ? values["Main TW Contact"].id
          : null,
        year: values.Year ? parseInt(values.Year.value) : null,
        description: this.state.content
      };
      let response = this.props.id
        ? await updateProject(project, this.props.id)
        : await createProject(project);
      if (this.props.id && response) {
        alert("Updated project!");
        this.setState({ created: true, response });
      } else if (response) {
        alert("Created project!");
        this.setState({ updated: true, response });
      }
    } else {
      alert("Client and Title of Project must not be empty");
    }
  }

  render() {
    let attributes = this.state.attributes;
    if (this.state.created || this.state.updated) {
      return <Redirect to={`/results/details/${this.state.response._id}`} />;
    }
    return attributes.length ? (
      <AuthConsumer>
        {({ isAuth }) => (
          <div>
            {isAuth && (
              <div className="container-fluid p-4">
                <div className="row">
                  <div className="col">
                    <Title
                      clients={
                        this.state.attributes.filter(
                          a => a.attribute === "Client"
                        )[0]
                      }
                      selected={this.state.selectedOptions.Client}
                      onChange={this.updateAttributes}
                      submit={this.submitProject}
                      name={this.state.name}
                      saveName={this.saveName}
                      createOption={this.createOption}
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
                      createOption={this.createOption}
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
            )}
            {!isAuth && <Redirect to={"/"} />}
          </div>
        )}
      </AuthConsumer>
    ) : null;
  }
}
