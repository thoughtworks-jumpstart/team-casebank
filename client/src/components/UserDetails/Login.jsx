import React, { Component } from "react";
import { AuthConsumer } from "./AuthContext";
import { login } from "../../data/userService";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    emailValid: null,
    passwordValid: null
  };
  render() {
    let { loginFailureMessage } = this.state;
    return (
      <AuthConsumer>
        {({ isAuth, login, logout }) => (
          <div className="mt-5 mx-auto text-center" style={{ width: "20%" }}>
            {isAuth && <Redirect to="/" />}
            {!isAuth && (
              <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control mb-3"
                  placeholder="Email address"
                  required
                  autoFocus
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
                  required
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
                {loginFailureMessage && loginFailureMessage.length > 0 && (
                  <div className="alert alert-danger" role="alert">
                    Login fail: {loginFailureMessage}
                  </div>
                )}
              </form>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }

  recordEmail = event => {
    this.setState({
      email: event.target.value,
      emailValid: event.target.checkValidity()
    });
  };

  recordPassword = event => {
    this.setState({
      password: event.target.value,
      passwordValid: event.target.checkValidity()
    });
  };

  submitLogin = async (authContextLogin, event) => {
    if (this.state.emailValid && this.state.passwordValid) {
      event.preventDefault();
      const loginStatus = await login(this.state.email, this.state.password);
      if (loginStatus.user) {
        authContextLogin(
          loginStatus.user.email,
          loginStatus.user.name,
          loginStatus.user.userid
        );
        console.log(`login userid ${loginStatus.user.userid}`);
      } else {
        this.setState({ loginFailureMessage: loginStatus.message });
      }
    }
  };
}
