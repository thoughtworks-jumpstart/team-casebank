import SearchResults from "./SearchResults";
import "jest-dom/extend-expect";
import { render } from "react-testing-library";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

describe("Renders Case component with no data", () => {
  const { getByText } = render(<SearchResults />);
  it("should render the Project property name", () => {
    expect(getByText(/Project/)).toBeInTheDocument();
  });

  it("Should render Client property name", () => {
    expect(getByText(/Client/)).toBeInTheDocument();
  });

  it("Should render Region property name", () => {
    expect(getByText(/Region/)).toBeInTheDocument();
  });

  it("Should render Year property name", () => {
    expect(getByText(/Year/)).toBeInTheDocument();
  });

  it("Should render Industry property name", () => {
    expect(getByText(/Industry/)).toBeInTheDocument();
  });

  it("Should render No results", () => {
    expect(getByText(/No results/)).toBeInTheDocument();
  });
});

describe("Renders Case component with sample data", () => {
  const resultList = [
    {
      _id: "asd2390384jkbudis",
      name: "Sleep-app",
      client: "Sleep Well Inc",
      nda: "yes",
      description: `To create an app to sleep well`,
      main_tw_contact: "John Mayer",
      techstack: ["javascript", "react", "mongoose"],
      year: 2018,
      status: "Ongoing",
      region: "Southeast Asia",
      country: "Singapore",
      office: "Singapore",
      industry: "general services",
      phase: "Prototype",
      members: ["John Mayer", "Mary Lamb", "Betty"],
      tag: ""
    },
    {
      _id: "sdd2390468jkbudis",
      name: "Wellderly",
      client: "Wellderly Inc",
      nda: "no",
      description: "To create an app to provide elderly care services",
      main_tw_contact: "Gordon",
      techstack: ["ruby", "rails"],
      year: 2017,
      status: "Completed",
      region: "Asia",
      country: "Malaysia",
      office: "Malaysia",
      industry: "healthcare",
      phase: "Prototype",
      members: ["Yamin", "Angeline"],
      tag: ""
    }
  ];
  const { getByText } = render(
    <Router>
      <SearchResults resultList={resultList} />
    </Router>
  );

  it("Should render sample data project Sleep-app", () => {
    expect(getByText(/Sleep-app/)).toBeInTheDocument();
  });

  it("Should render sample data client Sleep Well Inc", () => {
    expect(getByText(/Sleep Well Inc/)).toBeInTheDocument();
  });

  it("Should render sample data region Southeast Asia", () => {
    expect(getByText(/Southeast Asia/)).toBeInTheDocument();
  });

  it("Should render sample data year 2018", () => {
    expect(getByText(/2018/)).toBeInTheDocument();
  });

  it("Should render sample data industry 2018", () => {
    expect(getByText(/general services/)).toBeInTheDocument();
  });
});
