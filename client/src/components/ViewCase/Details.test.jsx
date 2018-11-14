import Details from "./Details";
import { render } from "react-testing-library";
import React from "react";
import { getProjects } from "../../data_projects";

describe("Renders Case component", () => {
  const proj = getProjects();
  const { getByText } = render(<Details id={proj[0]._id} />);
  it("should render the clients and project name", () => {
    expect(getByText(/Client/).textContent).toContain("Client");
    expect(getByText(/Name/).textContent).toContain("Name");
  });

  it("Should render techstack property name", () => {
    expect(getByText(/techstack/).textContent).toContain("techstack");
  });

  it("Should render nda property name", () => {
    expect(getByText(/nda/).textContent).toContain("nda");
  });

  it("Should render main_tw_contact property name", () => {
    expect(getByText(/main_tw_contact/).textContent).toContain(
      "main_tw_contact"
    );
  });
});
