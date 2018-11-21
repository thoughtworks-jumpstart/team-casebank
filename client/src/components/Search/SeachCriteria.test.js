import "jest-dom/extend-expect";
import { render } from "react-testing-library";
import React from "react";
import SearchCriteria from "./SearchCriteria";
import { BrowserRouter as Router } from "react-router-dom";

describe("Renders SelectCriteria component with sample data", () => {
  it("label text should appear", () => {
    const { getByText } = render(
      <Router>
        <SearchCriteria
          searchOptions={["Australia", "Southeast Asia"]}
          textLabel="Region"
          searchLabel="Region"
          handleChange={""}
          isMulti={false}
          selectedValue={[]}
        />
      </Router>
    );
    expect(getByText("Region")).toBeInTheDocument();
  });
});
