import React from "react";
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    name: "",
    email: "",
    userid: ""
  };

  componentDidMount = async () => {
    let storedState = localStorage.getItem("team-projectHub");
    if (storedState) {
      let parsedStoredState = JSON.parse(storedState);

      this.setState({
        isAuth: parsedStoredState.isAuth,
        name: parsedStoredState.name,
        email: parsedStoredState.email,
        userid: parsedStoredState.userid
      });
    }
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          name: this.state.name,
          email: this.state.email,
          userid: this.state.userid,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
  login = (email, name, userid) => {
    this.setState({
      isAuth: true,
      email,
      name,
      userid
    });
    localStorage.setItem(
      "team-projectHub",
      JSON.stringify({
        isAuth: true,
        email,
        name,
        userid
      })
    );
  };
  logout = () => {
    this.setState({
      isAuth: false,
      email: "",
      name: "",
      userid: ""
    });
    localStorage.removeItem("team-projectHub");
  };
}

const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };
