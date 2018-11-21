import Title from "./Title";
import { render } from "react-testing-library";
import React from "react";
import { getProjects } from "../../data/projectService";

describe("Renders Title component", () => {
  const { getByText } = render(
    <Title properties={{ name: "Something", client: "Someone" }} />
  );
  it("should render the clients and project name", () => {
    expect(getByText(/Client/).textContent).toContain("Someone");
    expect(getByText(/Name/).textContent).toContain("Something");
  });
});
