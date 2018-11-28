import { getProjectById } from "../../data/projectService";
import React, { Component } from "react";
import CaseProperties from "./CaseProperties";
import CaseDetails from "./CaseDetails";
import Title from "./Title";
import { AuthConsumer } from "../UserDetails/AuthContext";

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    let project = await getProjectById(this.props.id);
    this.setState({ project });
  }

  loginUserIsProjectMember = userid => {
    let projectmembers = [...this.state.project.members];
    projectmembers.push(this.state.project.main_tw_contact);
    const result = projectmembers.filter(member => userid === member._id);

    if (result && result.length > 0) {
      return true;
    }
    return false;
  };

  toBeImplemented = () => {};

  render() {
    if (this.state.project) {
      let properties = this.state.project;
      let title = { client: properties.client, name: properties.name };
      return (
        <AuthConsumer>
          {({ isAuth, userid }) => (
            <div className="container-fluid p-4">
              <div className="row text-left">
                <div className="col border-bottom">
                  <Title properties={title} />
                  {isAuth /*&& this.loginUserIsProjectMember(userid)*/ && (
                    <div className="pl-5 ">
                      <button
                        onClick={this.toBeImplemented}
                        type="button"
                        className="btn btn-secondary mt-3 mb-3"
                      >
                        Update case study
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row m-4">
                <div className="col-3 pl-4 border-right">
                  <CaseProperties properties={properties} />
                </div>
                <div className="col-9">
                  <CaseDetails description={properties.description} />
                </div>
              </div>
            </div>
          )}
        </AuthConsumer>
      );
    } else return null;
  }
}
