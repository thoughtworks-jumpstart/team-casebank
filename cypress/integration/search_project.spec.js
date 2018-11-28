const clickDropDown = (dropdownId, optToSelect) => {
  cy.get(`#${dropdownId} input`)
    .first()
    .click({
      force: true
    })
    .type(optToSelect, {
      force: true
    })
    .get(`#${dropdownId} .select__menu`)
    .contains(optToSelect)
    .click();
};

const getResultRows = () => {
  return cy.get(".rt-tr-group");
};

describe("Search For Project", () => {
  it("Check that home page loads", () => {
    cy.visit(Cypress.env("server"));

    cy.get("h2")
      .should("contain", "Heading")
      .and("be.visible");
  });

  it("Navigate to search page", () => {
    cy.get(".nav-item")
      .contains("Search")
      .click();

    cy.url().should("include", "/search");
  });

  it("Show Singapore projects", () => {
    clickDropDown("region-dropdown", "Singapore");

    getResultRows()
      .find("a")
      .should("have.length", 6);

    getResultRows()
      .should("contain", "Resort Website")
      .and("contain", "Creative Retail Platform")
      .and("contain", "Water Treatment Tracker");
  });

  it("Go to project details page", () => {
    cy.contains("Resort Website")
      .invoke("removeAttr", "target")
      .click();

    cy.url().should("include", "/results/details");
  });
});
