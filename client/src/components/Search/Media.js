import React, { Component } from "react";

async function getNewUrl() {
  try {
    const message = await fetch("/media", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });
    const jsonResult = await message.json();
    console.log(jsonResult)
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
    const newUrl = await JSON.stringify(getNewUrl());
    this.setState({ newUrl: newUrl });
  }

  render() {
    return <div>{JSON.stringify(this.state.newUrl)}</div>;
  }
}
