import React from "react";
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    name: "",
    email: ""
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          name: this.state.name,
          email: this.state.email,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
  login = (email, name) => {
    this.setState({
      isAuth: true,
      email,
      name
    });
  };
  logout = () => {
    this.setState({
      isAuth: false,
      email: "",
      name: ""
    });
  };
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };
