import Details from "./Details";
import { render } from "react-testing-library";
import React from "react";

describe("Renders Case component", () => {
  const { getByText } = render(<Details />);
  it("should render the clients and project name", () => {
    expect(getByText(/Client/).textContent).toContain("Client");
    expect(getByText(/Name/).textContent).toContain("Name");
  });

  it("Should render property name", () => {
    expect(getByText(/techstack/).textContent).toContain("techstack");
  });
});
