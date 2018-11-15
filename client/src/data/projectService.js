const projects = [
  {
    _id: "0001",
    name: "Sleep-app",
    client: "Sleep Well Inc",
    nda: "yes",
    description: "To create an app to sleep well",
    main_tw_contact: "John Mayer",
    techstack: ["javascript", "react", "mongoose"],
    year: 2018,
    status: "Ongoing",
    region: "Southeast Asia",
    office: "Singapore",
    industry: "general services",
    phase: "Prototype",
    members: ["John Mayer", "Mary Lamb", "Betty"],
    tag: "Health care"
  },
  {
    _id: "0002",
    name: "Telecommunications",
    client: "Singapore Telecommunications Limited",
    nda: "no",
    description:
      "Singapore Telecommunications Limited is a Singaporean telecommunications company. The company is the largest mobile network operators in Singapore with 4.1 million subscribers and through subsidiaries",
    main_tw_contact: "Chua Sock Koong",
    techstack: ["ruby", "rails"],
    year: 2017,
    status: "Completed",
    region: "Asia",
    office: "Kuala Lumpur",
    industry: "Telecommunications",
    phase: "Prototype",
    members: ["Yamin", "Angeline"],
    tag: "Telecommunications"
  },
  {
    _id: "0003",
    name: "SIA",
    client: "SIA Singapore",
    nda: "yes",
    description: "To create an app to cater for flight booking",
    main_tw_contact: "George",
    techstack: ["python", "sql"],
    year: 2017,
    status: "Completed",
    region: "Asia",
    office: "Singapore",
    industry: "aviation",
    phase: "Prototype",
    members: ["Calvin", "Brian"],
    tag: "Aviation"
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
    office: "Beijing",
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
    office: "New York",
    industry: "Food and Beverages",
    phase: "Prototype",
    members: ["Daniel Done", "Mary Lamb", "Vlad Russ"],
    tag: "Delivery App"
  },
  {
    _id: "0006",
    name: "Resort company",
    client: "Genting Group",
    nda: "yes",
    description:
      "The Genting Group is a company headquartered in the Wisma Genting in Kuala Lumpur, Malaysia. It comprises the holding company Genting Berhad, its listed subsidiaries Genting Malaysia Berhad, Genting Plantations Berhad, Genting Singapore Plc, as well as its wholly owned subsidiary Genting Energy Limited.",
    main_tw_contact: "Lim Goh Tung",
    techstack: ["javascript", "PHP", "mongoose"],
    year: 2018,
    status: "Ongoing",
    region: "Southeast Asia",
    office: "Singapore",
    industry: "entertainement",
    phase: "Prototype",
    members: ["John Mayer", "Mary Lamb", "Betty"],
    tag: "gambling"
  },
  {
    _id: "0007",
    name: "Commodities",
    client: "Noble Group",
    nda: "no",
    description:
      "Noble Group Limited is a commodities trader across a range of industrial and energy products. The company is incorporated in Bermuda and is listed in Singapore. Noble is in financial distress after defaulting on its financial obligations. ",
    main_tw_contact: "Richard Samuel",
    techstack: ["GraphQL", "rails"],
    year: 2017,
    status: "Completed",
    region: "Asia",
    office: "Kuala Lumpur",
    industry: "healthcare",
    phase: "Prototype",
    members: ["Yamin", "Angeline"],
    tag: ""
  },
  {
    _id: "0008",
    name: "Technology",
    client: "Creative Technology",
    nda: "yes",
    description:
      "A Singapore-based global company headquartered in Jurong East, Singapore. The principal activities of the company and its subsidiaries consist of the design, manufacture and distribution of digitized sound and video boards, computers and related multimedia, and personal digital entertainment products.",
    main_tw_contact: "Sim Wong Hoo",
    techstack: ["python", "nodejs"],
    year: 2017,
    status: "Completed",
    region: "Asia",
    office: "Singapore",
    industry: "technology",
    phase: "Prototype",
    members: ["Calvin", "Brian"],
    tag: "entertainment"
  },
  {
    _id: "0009",
    name: "Health care company",
    client: "Osim International",
    nda: "yes",
    description:
      "OSIM International Ltd, was originally established in Singapore in 1980 by Ron Sim, as an electrical and household appliance company under the name of R Sim Trading.",
    main_tw_contact: "Ron Sim",
    techstack: ["Java", "Go", "NoSQL"],
    year: 2016,
    status: "Deployed",
    region: "Taiwan",
    office: "Taipei",
    industry: "Healthcare",
    phase: "Delivery",
    members: ["Mayer", "Daniel", "Russ"],
    tag: "fitness App"
  },
  {
    _id: "0010",
    name: "Water Treatment",
    client: "Hyflux Ltd",
    nda: "yes",
    description:
      "Hyflux Ltd is a global environmental solutions company listed on the Singapore Stock Exchange, with a market capitalisation under SGD 200 million, and employs over 2,500 staff in Asia Pacific, the Middle East, Africa and the Americas.",
    main_tw_contact: "Olivia Lum",
    techstack: ["jQuery", "PostgreSQL"],
    year: 2000,
    status: "Ongoing",
    region: "Asia",
    office: "Hong Kong",
    industry: "Water Industry",
    phase: "Prototype",
    members: ["Veron", "Ken", "Russell"],
    tag: "water device App"
  }
];

function getProjects() {
  return projects;
}

function getProjectById(projectId) {
  return projects.find(project => project._id === projectId);
}

export { getProjects, getProjectById };
