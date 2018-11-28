import React, { Component } from "react";

async function getNewUrl() {
  try {
    const message = await fetch("/test", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });
    const jsonResult = await message.json();
    return jsonResult;
  } catch (error) {
    return "Error";
  }
  //return projects;
}

export default class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUrl: "YoYo"
    };
  }

  async componentDidMount() {
    const newUrl = await getNewUrl();
    this.setState({ newUrl: newUrl });
  }

  render() {
    return <div>{JSON.stringify(this.state.newUrl)}</div>;
  }
}
