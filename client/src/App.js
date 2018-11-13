import React, { Component } from "react";
import Main from "./main";
import SearchTechStack from "./components/search/searchTechStack";

class App extends Component {
  render() {
    return (
      <div>
        <SearchTechStack />
        <Main />
      </div>
    );
  }
}

export default App;
