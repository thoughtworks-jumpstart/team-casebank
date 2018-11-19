const offices = [
  { Australia: ["Brisbane", "Melbourne", "Sydney"] },
  { China: ["Beijing", "Chengdu", "Shanghai", "Shenzhen", "Wuhan", "Xi' An"] },
  {
    Europe: [
      "Barcelona",
      "Berlin",
      "Bologna",
      "Cologne",
      "Hamburg",
      "London",
      "Madrid",
      "Manchester",
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
      "Toronto"
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

  { SoutheastAsia: ["Bangkok", "Singapore"] }
];
export const getOffices = () => {
  return offices;
};

export const getFilteredOffices = projects => {
  let offices = [];
  offices = projects.map(item => {
    return item["office"];
  });
  let uniqueOffices = [...new Set(offices)];
  uniqueOffices.sort();
  return uniqueOffices;
};
