import CaseProperties from "./CaseProperties";
import { render } from "react-testing-library";
import React from "react";

describe("Name of the group", () => {
  const project = {
    _id: "asd2390384jkbudis",
    name: "Sleep-app",
    client: "Sleep Well Inc",
    nda: "yes",
    description: `To create an app to sleep well`,
    main_tw_contact: { name: "John Mayer" },
    techstack: ["javascript", "react", "mongoose"],
    year: 2018,
    region: "Southeast Asia",
    country: "Singapore",
    office: "Singapore",
    industry: "general services",
    members: [{ name: "John Mayer" }, { name: "Mary Lamb" }, { name: "Betty" }]
  };
  const { getByText } = render(<CaseProperties properties={project} />);
  it("Should render techstack property name", () => {
    expect(getByText(/javascript/).textContent).toContain("javascript");
  });

  it("Should render nda property name", () => {
    expect(getByText(/yes/).textContent).toContain("yes");
  });

  it("Should render main_tw_contact property name", () => {
    expect(getByText(/John Mayer/).textContent).toContain("John Mayer");
  });
});
