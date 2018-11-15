import { render, fireEvent } from "react-testing-library";
import React from "react";
import SearchTechStack from "./SearchTechStack";
import { getTechstack } from "../../data/techStackService";

describe("Renders dropdown menu for techs", () => {
  it("should render all techs that it gets from getTechStack()", () => {
    const { container } = render(<SearchTechStack />);
    const allItems = container.querySelectorAll(".dropdown-item");
    const itemValues = Array.from(allItems).map(item => item.textContent);
    let numTech = getTechstack().length + 1;

    expect(allItems.length).toBe(numTech);
    expect(itemValues).toContain("NoSQL");
    expect(itemValues).toContain("Javascript");
    expect(itemValues).toContain("All");
  });

  it("should call prop onClick and pass in tech stack value when selected", () => {
    const handleSubmit = jest.fn();
    let Tech = ["All", ...getTechstack().map(tech => tech)];
    const { container } = render(<SearchTechStack onClick={handleSubmit} />);

    const secondItem = container.querySelectorAll(".dropdown-item")[2];
    fireEvent.click(secondItem);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(Tech[2]);
  });

  it("should display 'Techstack: All' on first load", () => {
    const { container } = render(<SearchTechStack selectedOptions="All" />);

    expect(container.querySelector("#dropdownMenuButton").textContent).toEqual(
      "Techstack: All"
    );
  });
});
