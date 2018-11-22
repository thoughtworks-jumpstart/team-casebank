const clickDropDown = (dropdownId, optToSelect) => {
  cy.get(`#${dropdownId} input`)
    .first()
    .click({ force: true })
    .type(optToSelect, { force: true })
    .get(`#${dropdownId} .select__menu`)
    .contains(optToSelect)
    .click();
};

const getResultRows = () => {
  return cy.get(".rt-tr-group");
};

const checkDropdownIsDisplayed = (index, labelName, idName) => {
  cy.get(".dropdown-label")
    .eq(index)
    .should("have.text", labelName);
  cy.get(`#${idName}-dropdown`).should("be.visible");
};

describe("Search For Project", () => {
  it("Check that home page loads", () => {
    cy.visit(Cypress.env("server"));

    cy.get("h1")
      .should("contain", "Home")
      .and("be.visible");
  });

  it("Navigate to search page", () => {
    cy.get(".nav-item")
      .contains("Search")
      .click();

    cy.url().should("include", "/search");
  });

  it("Check that drop downs are visible", () => {
    checkDropdownIsDisplayed(0, "Client", "client");
    checkDropdownIsDisplayed(1, "Project", "project");
    checkDropdownIsDisplayed(2, "Region", "region");
    checkDropdownIsDisplayed(3, "Office", "office");
    checkDropdownIsDisplayed(4, "Year", "year");
    checkDropdownIsDisplayed(5, "NDA Status", "nda");
    checkDropdownIsDisplayed(6, "Industry", "industry");
    checkDropdownIsDisplayed(7, "Tech Stack", "techstack");
  });

  it("Check that region filter is working", () => {
    clickDropDown("region-dropdown", "Southeast Asia");

    getResultRows()
      .find("a")
      .should("have.length", 7);

    getResultRows().within(() => {
      cy.get("a")
        .eq(0)
        .should("have.text", "Flexible Digital Food Ordering Platform");
      cy.get("a")
        .eq(2)
        .should("have.text", "Creative Retail Platform");
      cy.get("a")
        .eq(6)
        .should("have.text", "Water Treatment Tracker");
    });
  });

  it("Go to project details page", () => {
    cy.contains("Resort Website")
      .invoke("removeAttr", "target")
      .click();

    cy.url().should("include", "/results/details");
  });
});
