import React, { Component } from "react";
import { AuthConsumer } from "./AuthContext";
import { login } from "../../data/userService";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, login, logout }) => (
          <div className="text-center">
            <form className="form-signin">
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <label htmlFor="inputEmail" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                required=""
                autoFocus=""
                onChange={this.recordEmail}
              />
              <label htmlFor="inputPassword" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required=""
                onChange={this.recordPassword}
              />
              <div className="checkbox mb-3" />
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
                onClick={event => {
                  this.submitLogin(login, event);
                }}
              >
                Sign in
              </button>
              <div className="checkbox mb-3" />
            </form>
          </div>
        )}
      </AuthConsumer>
    );
  }

  recordEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  recordPassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  submitLogin = async (authContextLogin, event) => {
    event.preventDefault();
    const loginStatus = await login(this.state.email, this.state.password);
    if (loginStatus.user) {
      authContextLogin(loginStatus.user.email, loginStatus.user.name);
    } else {
      this.setState({ loginFailureMessage: loginStatus.message });
    }
  };
}
