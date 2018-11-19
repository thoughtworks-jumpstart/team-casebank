const regions = [
  "Australia",
  "China",
  "Europe",
  "India",
  "North America",
  "Latin America",
  "Southeast Asia"
];

export const getRegions = () => {
  return regions;
};

export const getFilteredRegions = projects => {
  let regions = [];
  regions = projects.map(item => {
    return item["region"];
  });
  let uniqueRegions = [...new Set(regions)];
  uniqueRegions.sort();
  return uniqueRegions;
};
