const properties = [
  {
    attribute: "Techstack",
    list: [
      "C",
      "C++",
      "Go",
      "GraphQL",
      "Java",
      "Javascript",
      "jQuery",
      "Mongoose",
      "Nodejs",
      "NoSQL",
      "Perl",
      "PHP",
      "Python",
      "PostgreSQL",
      "Rails",
      "React",
      "Ruby",
      "SQL",
      "Swift"
    ]
  },
  {
    attribute: "Region",
    list: [
      "Australia",
      "China",
      "Europe",
      "India",
      "North America",
      "Latin America",
      "Southeast Asia",
      "Africa"
    ]
  },
  {
    attribute: "Office",
    list: [
      { Australia: ["Brisbane", "Melbourne", "Perth", "Sydney"] },
      {
        China: ["Beijing", "Chengdu", "Shanghai", "Shenzhen", "Wuhan", "Xi' An"]
      },
      {
        Europe: [
          "Barcelona",
          "Berlin",
          "Bologna",
          "Cologne",
          "Hamburg",
          "Istanbul",
          "London",
          "Madrid",
          "Manchester",
          "Milan",
          "Munich"
        ]
      },
      {
        India: [
          "Bangalore",
          "Chennai",
          "Coimbatore",
          "Gurgaon",
          "Hyderabad",
          "Mumbai",
          "Noida",
          "Pune"
        ]
      },
      {
        NorthAmerica: [
          "Atlanta",
          "Chicago",
          "Dallas",
          "Denver",
          "New York",
          "San Francisco",
          "Toronto",
          "Calgary"
        ]
      },
      {
        LatinAmerica: [
          "Belo Horizonte",
          "Porto Alegre",
          "Quito",
          "Recife",
          "Santiago",
          "São Paulo"
        ]
      },
      { SoutheastAsia: ["Bangkok", "Singapore"] },
      { Africa: ["Johannesburg", "Kampala"] }
    ]
  },
  {
    attribute: "Industry",
    list: [
      "F&B",
      "Retail",
      "Financial",
      "Travel",
      "Pharmaceutical",
      "Automotive",
      "Government",
      "Telecommunications",
      "Charity",
      "B2B",
      "B2C",
      "Real estate",
      "Entertainment",
      "Hospitality",
      "Media",
      "Mining"
    ]
  },
  {
    attribute: "nda",
    list: ["Internal only", "External can", "Not sure, please check"]
  }
];

module.exports = properties;
