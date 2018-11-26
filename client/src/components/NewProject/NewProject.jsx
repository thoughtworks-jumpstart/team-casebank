import React, { Component } from "react";
import Editor from "./Editor";
import ProjectAttributes from "./ProjectAttributes";
import Title from "./Title";

export default class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChangeHTML = this.onChangeHTML.bind(this);
  }

  onChangeHTML(content) {
    this.setState(content);
  }
  async componentDidMount() {
  
  }
  render() {
    return (
      <div className="container-fluid p-4">
        <div className="row text-center">
          <div className="col">
            <Title properties={title} />
          </div>
        </div>
        <div className="row m-4">
          <div className="col-3 pl-4">
            <ProjectAttributes properties={properties} />
          </div>
          <div className="col-9">
            <Editor onChangeHTML={this.onChangeHTML} />
          </div>
        </div>
      </div>
    );
  }
}
