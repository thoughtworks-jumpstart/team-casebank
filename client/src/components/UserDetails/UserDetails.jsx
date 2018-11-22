import React, { Component } from "react";
import { getUserById } from "../../data/userService";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  async componentDidMount() {
    let user = await getUserById(this.props.id);
    this.setState({ user });
  }
  render() {
    if (this.state.user) {
      let { user } = this.state;
      return (
        <div className="container-fluid p-4">
          <div className="row m-4">
            <div className="col-2" />
            <div className="col-3 pl-4">
              <SideBar user={user} />
            </div>
            <div className="col-5">
              <MainContent user={user} />
            </div>
            <div className="col-2" />
          </div>
        </div>
      );
    } else return null;
  }
}
