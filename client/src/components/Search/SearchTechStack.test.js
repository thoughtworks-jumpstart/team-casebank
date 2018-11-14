import { render, fireEvent } from "react-testing-library";
import React from "react";
import SearchTechStack from "./SearchTechStack";

describe("Renders dropdown menu for techs", () => {
  it("should render all techs that it gets from getTechStack()", () => {
    const { container } = render(<SearchTechStack />);
    const allItems = container.querySelectorAll(".dropdown-item");
    const itemValues = Array.from(allItems).map(item => item.textContent);

    expect(allItems.length).toBe(9);
    expect(itemValues).toContain("No SQL");
    expect(itemValues).toContain("Javascript");
    expect(itemValues).toContain("All");
  });

  it("should call prop onClick and pass in tech stack value when selected", () => {
    const handleSubmit = jest.fn();
    const { container } = render(<SearchTechStack onClick={handleSubmit} />);

    const secondItem = container.querySelectorAll(".dropdown-item")[1];
    fireEvent.click(secondItem);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("Javascript");
  });

  it("should display 'Techstack: All' on first load", () => {
    const { container } = render(<SearchTechStack selectedOptions="All" />);

    expect(container.querySelector("#dropdownMenuButton").textContent).toEqual(
      "Techstack: All"
    );
  });
});
