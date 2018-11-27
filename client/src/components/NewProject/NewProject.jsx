import React, { Component } from "react";
import Editor from "./Editor";
import ProjectAttributes from "./ProjectAttributes";
import Title from "./Title";
import getProjectAttributes from "../../data/attributeService";
import { getUsers } from "../../data/userService";
export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: {
        Region: null,
        Techstack: [],
        Office: null,
        Industry: null,
        nda: null
      },
      attributes: []
    };
    this.onChangeHTML = this.onChangeHTML.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
  }

  onChangeHTML(content) {
    this.setState({ content });
  }

  async componentDidMount() {
    const attributes = await getProjectAttributes();
    const users = await getUsers();
    const userList = users.map(user => user.name);
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

  render() {
    let attributes = this.state.attributes;
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
            <Editor onChangeHTML={this.onChangeHTML} />
          </div>
        </div>
      </div>
    ) : null;
  }
}
