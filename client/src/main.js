import React, { Component } from "react";
import { getBackEndData } from "./handler/case_data_handler";
import ResultList from "./components/search/searchResults";

class Main extends Component {
  state = {
    listing: [
      {
        _id: "asd2390384jkbudis",
        name: "Sleep-app",
        client: "Sleep Well Inc",
        year: 2018,
        region: "Southeast Asia",
        country: "Singapore",
        industry: "general services"
      },
      {
        _id: "sdd2390468jkbudis",
        name: "Wellderly",
        client: "Wellderly Inc",
        year: 2017,
        region: "Asia",
        country: "Malaysia",
        industry: "healthcare"
      },
      {
        _id: "sdd2390468jkbudi1",
        name: "Amazon Cashless",
        client: "Amazon",
        year: 2015,
        region: "Asia",
        industry: "healthcare"
      },
      {
        _id: "sdd2390468jkbudi2",
        name: "Alibaba Govt Cloud",
        client: "Alibaba",
        year: 2017,
        region: "Asia",
        industry: "healthcare"
      },
      {
        _id: "sdd2390468jkbudi3",
        name: "Aha Weather Mapping",
        client: "Aha Inc",
        year: 2017,
        region: "Asia",
        industry: "healthcare"
      },
      {
        _id: "sdd2390468jkbudi4",
        name: "Fila wearable tech",
        client: "Fila Inc",
        year: 2017,
        region: "Europe",
        industry: "Sports"
      },
      {
        _id: "sdd2390468jkbudi5",
        name: "Domino Pizza Customer Trend Tracking",
        client: "Domino Pizza Pte Ltd",
        year: 2017,
        region: "Europe",
        industry: "F&B"
      }
    ]
  };
  async componentDidMount() {
    const results = await getBackEndData();
    if (results) {
      this.setState({ results: results.message });
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.results}</h1>
        <ResultList resultList={this.state.listing} />
      </div>
    );
  }
}

export default Main;
