const projects = [
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
  },
  {
    _id: "xfd2391234jkbabcd",
    name: "SIA",
    client: "SIA Singapore",
    nda: "yes",
    description: "To create an app to cater for flight booking",
    main_tw_contact: "George",
    techstack: ["python", "sql"],
    year: 2017,
    status: "Completed",
    region: "Asia",
    country: "Singapore",
    office: "Singapore",
    industry: "aviation",
    phase: "Prototype",
    members: ["Calvin", "Brian"],
    tag: ""
  },
  {
    _id: "0004",
    name: "Pizza Delivery",
    client: "Superthin Pizzeria",
    description:
      "Savour Superthin Pizzeria's signature pan pizzas with scrumptious ingredients, or choose from a wide range of baked rice, pasta and Italian dishes. Try the irresistible Sweet ‘N’ Spicy Drumlets or simply order the SUPER Platter that features all your favourite sides on one plate. Enjoy Superthin's affordable food offerings!",
    main_tw_contact: "John Mayer",
    techstack: ["ruby", "rails", "nosql"],
    year: 2016,
    status: "Deployed",
    region: "China",
    country: "China",
    office: "China",
    industry: "Food and Beverages",
    phase: "Delivery",
    members: ["John Mayer", "Mary Lamb", "Daniel Done", "Vlad Russ"],
    tag: "Delivery App"
  },
  {
    _id: "0005",
    name: "Supermarket API",
    client: "FreshFood People Corp",
    description:
      "FreshFood People Corp is an American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores.Headquartered in Bentonville, Arkansas, the company was founded by Sam Walton in 1962 and incorporated on October 31, 1969. It also owns and operates Sam's Club retail warehouses. As of January 31, 2018, FreshFood People Corp has 11,718 stores and clubs in 28 countries, operating under 59 different names.The company operates under the name FreshFood People in the United States and Canada, as Fresh de México y Centroamérica in Mexico and Central America, as FreshFood in the United Kingdom, as the Tabemono Group in Japan, and as Cheapest in India. It has wholly owned operations in Argentina, Chile, Brazil, Canada, and South Africa.",
    main_tw_contact: "Daniel Done",
    techstack: ["javascript", "react"],
    year: 2018,
    status: "Ongoing",
    region: "United States",
    country: "United States",
    office: "Ontario",
    industry: "Food and Beverages",
    phase: "Prototype",
    members: ["Daniel Done", "Mary Lamb", "Vlad Russ"],
    tag: "Delivery App"
  }
];

function getProjects() {
  return projects;
}

function getProjectById(projectId) {
  return projects.find(project => project._id === projectId);
}

export { getProjects, getProjectById };
