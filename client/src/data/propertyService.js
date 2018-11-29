export const getFilteredProperties = (projects, property) => {
  let properties = [];
  properties = projects.map(item => {
    return item[property];
  });
  let uniqueProperties = [...new Set(properties), "Unknown"];
  uniqueProperties.sort();
  return uniqueProperties;
};

export const getFilteredMultiProperties = (projects, property) => {
  let properties = [];
  properties = projects.flatMap(item => {
    return item[property];
  });

  let uniqueProperties = [...new Set(properties), "Unknown"];
  uniqueProperties.sort();
  return uniqueProperties;
};
