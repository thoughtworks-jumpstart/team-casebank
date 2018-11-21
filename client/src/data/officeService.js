const offices = [
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
];
export const getOffices = () => {
  return offices;
};
